import { create } from 'zustand';
import Dagre from '@dagrejs/dagre';
import { v4 as uuidv4 } from 'uuid';
import { getFlowElements, getIntents } from '../api';
const position = { x: 0, y: 0 };

let oldNodes = [];
const getLayoutedElements = ({ nodes, edges }) => {
  const dagreGraph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 80;
  const nodeHeight = 50;
  dagreGraph.setGraph({ rankdir: 'LR' });
  console.log(nodes, edges);

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  Dagre.layout(dagreGraph);
  if (oldNodes.length < 1) {
    nodes.forEach(node => {
      const nodeWithPosition = dagreGraph.node(node.id);
      console.log(node, nodeWithPosition);
      node.targetPosition = 'left';
      node.sourcePosition = 'right';
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
      console.log(nodeWithPosition.rank);
    });
  } else {
    // retain the old position of the nodes if the nodes are already present, otherwise layout the nodes
    nodes.forEach(node => {
      const nodeWithPosition = dagreGraph.node(node.id);
      let oldNode = oldNodes.find(oldNode => oldNode.id === node.id);
      if (oldNode) {
        node.targetPosition = 'left';
        node.sourcePosition = 'right';
        node.position = oldNode.position;
      } else {
        node.targetPosition = 'left';
        node.sourcePosition = 'right';
        // maintain the same y for the new nodes if the parentNode is play or speak
        if (node.data.parentNodeId) {
          // this seems to be a bug if we dont use a variable to store node.data.parentNodeId
          let pId = node.data.parentNodeId;
          let parentNode = nodes.find(node => node.id == pId);
          let x, y;

          x = nodeWithPosition.x - nodeWidth / 2 + 100;

          if (parentNode?.type !== 'nlp') {
            y = parentNode?.position?.y;
          } else {
            // y = oldNodes.find((oldNode) => oldNode.id === parentNode.data.parentNodeId).position.y;
            y = nodeWithPosition.y;
          }

          // if there be any other node in the oldNodes with the same position, then increment the x by 20 and y by 20 and check again till no node has the same position in the oldNodes
          let samePositionNode = oldNodes.find(
            oldNode => oldNode.position.x === x && oldNode.position.y === y
          );
          while (samePositionNode) {
            x += 20;
            y += 20;
            samePositionNode = oldNodes.find(
              oldNode => oldNode.position.x === x && oldNode.position.y === y
            );
          }

          node.position = {
            x,
            y,
          };
        } else {
          node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
          };
        }
      }
    });
  }

  oldNodes = nodes;
  return { nodes, edges };
};
const deleteChildElementsRecursively = (nodeId, nodes, edges) => {
  let newNodes = nodes.filter(node => node.id !== nodeId),
    newEdges = edges.filter(edge => edge.source !== nodeId);
  let childNodes = nodes.filter(node => node.data.parentNodeId === nodeId);
  console.log(childNodes);
  // newNodes = newNodes.filter(node => node.id !== childNodes[0].id)
  // newEdges = newEdges.filter(edge => edge.source !== childNodes[0].id)
  childNodes.forEach(childNode => {
    let x = deleteChildElementsRecursively(childNode.id, newNodes, newEdges);
    newNodes = x.newNodes;
    newEdges = x.newEdges;
  });
  // childNodes.forEach((childNode) => {
  //     let x = deleteChildElementsRecursively(childNode.id, newNodes, newEdges)
  //     newNodes = x.newNodes;
  //     newEdges = x.newEdges;
  // });

  return { newNodes, newEdges };
};

const useStore = create((set, get) => ({
  botId: '',
  bot: {},
  data: {},
  nodes: [],
  edges: [],
  intents: [],
  audioFiles: [],
  menuAnchorEl: null,
  setMenuAnchorEl: (e, data) => {
    // console.clear();
    console.log('setMenuAnchorEl', {
      x: e.clientX,
      y: e.clientY,
      data,
    });
    set({
      menuAnchorEl: {
        x: e.clientX,
        y: e.clientY,
      },
      data,
    });
  },
  setBotId: botId => {
    return new Promise((resolve, reject) => {
      set({ botId });
      getFlowElements(botId).then(async flowElements => {
        oldNodes = [];
        console.log(flowElements);
        if (
          !flowElements ||
          (flowElements.nodes?.length === 0 && flowElements.edges?.length === 0)
        ) {
          let startNode = uuidv4(),
            addNode = uuidv4(),
            newNodes = [
              {
                id: startNode,
                type: 'start',
                position,
                data: {
                  label: 'Start',
                  nodeId: startNode,
                  childNodeId: addNode,
                },
              },
              {
                id: addNode,
                type: 'add',
                position,
                data: {
                  nodeId: addNode,
                  parentNodeId: startNode,
                },
              },
            ],
            newEdges = [
              {
                id: `e|${startNode}|${addNode}`,
                source: startNode,
                target: addNode,
              },
            ];
          let { nodes, edges } = await getLayoutedElements({
            nodes: newNodes,
            edges: newEdges,
          });
          set({
            nodes,
            edges,
          });
          return;
        } else {
          let { nodes, edges } = getLayoutedElements(flowElements);
          // let { nodes, edges} = getLayoutedElements(flowElements);
          console.log(nodes, edges);
          set({
            nodes,
            edges,
          });
          return;
        }
      });
      getIntents(botId).then(intents => {
        set({
          intents,
        });
      });
      resolve();
    });
  },
  addPlayNode: (nodeData, audioFilesArray) => {
    let label = audioFilesArray[0];

    if (audioFilesArray.length > 1)
      label += ` + ${audioFilesArray.length - 1} more`;

    let newNode = uuidv4();
    let newNodes = [
        {
          id: nodeData.nodeId,
          type: 'play',
          position,
          data: {
            label,
            nodeId: nodeData.nodeId,
            parentNodeId: nodeData.parentNodeId,
            childNodeId: newNode,
            audioFiles: audioFilesArray,
          },
        },
        {
          id: newNode,
          type: 'add',
          position,
          data: {
            nodeId: newNode,
            parentNodeId: nodeData.nodeId,
          },
        },
      ],
      newEdge = {
        id: `e|${nodeData.nodeId}|${newNode}`,
        source: nodeData.nodeId,
        target: newNode,
      };
    // console.clear();
    console.log(newNodes);

    let { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        ...newNodes,
      ],
      edges: [...get().edges, newEdge],
    });
    let Xnodes = [...nodes];
    let Xedges = [...edges];
    set({ nodes: Xnodes, edges: Xedges });
  },
  addWebhookNode: (nodeData, webhook) => {
    const label = webhook;

    const newNode = uuidv4();

    const newNodes = [
      {
        id: nodeData.nodeId,
        type: 'webhook',
        position,
        data: {
          label,
          nodeId: nodeData.nodeId,
          parentNodeId: nodeData.parentNodeId,
          childNode: newNode,
          webhook,
        },
      },
      {
        id: newNode,
        type: 'add',
        position,
        data: {
          nodeId: newNode,
          parentNodeId: nodeData.nodeId,
        },
      },
    ];
    const newEdge = {
      id: `e|${nodeData.nodeId}|${newNode}`,
      source: nodeData.nodeId,
      target: newNode,
    };

    const { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        ...newNodes,
      ],
      edges: [...get().edges, newEdge],
    });

    // const Xnodes = [...nodes];
    // const Xedges = [...edges];
    set({ nodes, edges });
  },
  addSpeakNode: (nodeData, textsArray) => {
    let label = textsArray[0];

    if (textsArray.length > 1) label += ` + ${textsArray.length - 1} more`;

    let newNode = uuidv4();
    let newNodes = [
        {
          id: nodeData.nodeId,
          type: 'speak',
          position,
          data: {
            label,
            nodeId: nodeData.nodeId,
            parentNodeId: nodeData.parentNodeId,
            childNodeId: newNode,
            texts: textsArray,
          },
        },
        {
          id: newNode,
          type: 'add',
          position,
          data: {
            nodeId: newNode,
            parentNodeId: nodeData.nodeId,
          },
        },
      ],
      newEdge = {
        id: `e|${nodeData.nodeId}|${newNode}`,
        source: nodeData.nodeId,
        target: newNode,
      };

    let { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        ...newNodes,
      ],
      edges: [...get().edges, newEdge],
    });
    set({ nodes, edges });
  },
  addNlpNode: (nodeData, selectedIntentNames) => {
    let newNodes = [],
      newEdges = [],
      intentsObj = [];

    selectedIntentNames.forEach(selectedIntentName => {
      //check if sin === 'cf'
      //{id: null, intentType: 'flowing'}
      let intent = [
        ...get().intents,
        { intentName: 'CUSTOM_FALLBACK', intentType: 'flowing' },
      ].find(intent => intent.intentName === selectedIntentName);
      // console.clear();
      console.log('intent', intent);
      let intentName = intent.intentName,
        intentType = intent?.intentType;

      console.log('intentName', intentName);
      console.log('intentType', intentType);

      if (intentType === 'flowing') {
        let newNodeId = uuidv4();

        newNodes.push({
          id: newNodeId,
          type: 'add',
          position,
          data: {
            nodeId: newNodeId,
            parentNodeId: nodeData.nodeId,
          },
        });

        newEdges.push({
          id: `e|${nodeData.nodeId}|${newNodeId}`,
          source: nodeData.nodeId,
          target: newNodeId,
          label: intentName,
        });

        intentsObj.push({
          intentName: intentName,
          intentType: intentType,
          childNodeId: newNodeId,
        });
      } else {
        intentsObj.push({
          intentName,
          intentType,
          childNodeId: null,
        });
      }
    });

    newNodes.unshift({
      id: nodeData.nodeId,
      type: 'nlp',
      position,
      data: {
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
        intents: intentsObj,
      },
    });

    let { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        ...newNodes,
      ],
      edges: [...get().edges, ...newEdges],
    });
    set({ nodes, edges });
  },
  addTransferNode: (nodeData, { context, extension }) => {
    if (extension.length === 0) return;
    else {
      let label =
        context.length > 0
          ? `Context : ${context} \n Extension : ${extension}`
          : `Extension : ${extension}`;

      let newNode = {
        id: nodeData.nodeId,
        type: 'transfer',
        position,
        data: {
          label,
          nodeId: nodeData.nodeId,
          parentNodeId: nodeData.parentNodeId,
          context,
          extension,
        },
      };

      let { nodes, edges } = getLayoutedElements({
        nodes: [
          ...get().nodes.filter(node => node.id !== nodeData.nodeId),
          newNode,
        ],
        edges: [...get().edges],
      });
      set({ nodes, edges });
    }
  },
  addTerminateNode: nodeData => {
    console.log('terminate');
    let newNode = {
      id: nodeData.nodeId,
      type: 'terminate',
      position,
      data: {
        label: 'Terminate',
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
      },
    };

    let { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        newNode,
      ],
      edges: [...get().edges],
    });
    set({ nodes, edges });
  },
  updatePlayNode: (nodeData, data) => {
    let { audioFilesArray } = data;
    let label = audioFilesArray[0];

    if (audioFilesArray.length > 1)
      label += ` + ${audioFilesArray.length - 1} more`;

    let newNode = {
      id: nodeData.nodeId,
      type: 'play',
      position,
      data: {
        label,
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
        childNodeId: nodeData.childNodeId,
        audioFiles: audioFilesArray,
      },
    };

    let { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        newNode,
      ],
      edges: [...get().edges],
    });
    set({ nodes, edges });
  },
  updateWebhookNode: (nodeData, webhook) => {
    const newNode = {
      id: nodeData.nodeId,
      type: 'webhook',
      position,
      data: {
        label: webhook,
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
        childNodeId: nodeData.childNodeId,
        webhook,
      },
    };
    // console.clear();
    console.log(webhook);
    const { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        newNode,
      ],
      edges: [...get().edges],
    });
    set({ nodes, edges });
  },
  updateSpeakNode: (nodeData, textsArray) => {
    let label = textsArray[0];

    if (textsArray.length > 1) label += ` + ${textsArray.length - 1} more`;

    let newNode = {
      id: nodeData.nodeId,
      type: 'speak',
      position,
      data: {
        label,
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
        childNodeId: nodeData.childNodeId,
        texts: textsArray,
      },
    };

    let { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        newNode,
      ],
      edges: [...get().edges],
    });
    set({ nodes, edges });
  },
  updateProcessorNode: (nodeData, initialIntentNames, selectedIntentNames) => {
    // console.clear();
    console.log('Entered updateProcessorNode');
    let newNodes = get().nodes,
      newEdges = get().edges,
      intentsObj = nodeData.intents;

    let intentsToBeDeleted = initialIntentNames.filter(
      initialIntentName => !selectedIntentNames.includes(initialIntentName)
    );
    let intentsToBeAdded = selectedIntentNames.filter(
      selectedIntentName => !initialIntentNames.includes(selectedIntentName)
    );

    // intentsToBeDeleted.forEach((intentToBeDeleted) => {

    intentsToBeDeleted.forEach(intentToBeDeleted => {
      let intent = [
        ...get().intents,
        { intentName: 'CUSTOM_FALLBACK', intentType: 'flowing' },
      ].find(intent => intent.intentName === intentToBeDeleted);
      let intentName = intent.intentName,
        intentType = intent.intentType;
      let intentIndex = intentsObj.findIndex(
        intent => intent.intentName === intentToBeDeleted
      );

      if (intentType === 'flowing') {
        // delete the child node corresponding to the intentObj childNodeId recursively deleteChildElements
        let childNodeId = intentsObj[intentIndex].childNodeId;
        let x = deleteChildElementsRecursively(childNodeId, newNodes, newEdges);
        newNodes = x.newNodes;
        newEdges = x.newEdges;

        // delete the edge corresponding to the intentObj childNodeId
        let edgeIndex = newEdges.findIndex(
          edge => edge.source === nodeData.nodeId && edge.target === childNodeId
        );
        newEdges.splice(edgeIndex, 1);
      }
      intentsObj.splice(intentIndex, 1);
    });

    intentsToBeAdded.forEach(intentToBeAdded => {
      console.log('intentToBeAdded', intentToBeAdded);
      let intent = [
        ...get().intents,
        { intentName: 'CUSTOM_FALLBACK', intentType: 'flowing' },
      ].find(intent => intent.intentName === intentToBeAdded);
      let intentName = intent.intentName,
        intentType = intent?.intentType;

      if (intentType === 'flowing') {
        let newNodeId = uuidv4();

        newNodes.push({
          id: newNodeId,
          type: 'add',
          position,
          data: {
            nodeId: newNodeId,
            parentNodeId: nodeData.nodeId,
          },
        });

        newEdges.push({
          id: `e|${nodeData.nodeId}|${newNodeId}`,
          source: nodeData.nodeId,
          target: newNodeId,
          label: intentName,
        });

        intentsObj.push({
          intentName: intentName,
          intentType: intentType,
          childNodeId: newNodeId,
        });
      } else {
        intentsObj.push({
          intentName,
          intentType,
          childNodeId: null,
        });
      }
    });

    console.log(intentsObj);

    newNodes = newNodes.filter(node => node.id !== nodeData.nodeId);
    newNodes.push({
      id: nodeData.nodeId,
      type: 'nlp',
      position,
      data: {
        label: nodeData.label,
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
        intents: intentsObj,
      },
    });

    console.log(newNodes);
    console.log(newEdges);

    let { nodes, edges } = getLayoutedElements({
      nodes: newNodes,
      edges: [...newEdges],
    });
    set({ nodes, edges });
  },
  updateTransferNode: (nodeData, { context, extension }) => {
    let newNode = {
      id: nodeData.nodeId,
      type: 'transfer',
      position,
      data: {
        label:
          context.length > 0
            ? `Context : ${context} \n Extension : ${extension}`
            : `Extension : ${extension}`,
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
        context,
        extension,
      },
    };

    let { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        newNode,
      ],
      edges: [...get().edges],
    });
    set({ nodes, edges });
  },
  removePlayNode: nodeData => {
    let { newNodes, newEdges } = deleteChildElementsRecursively(
      nodeData.nodeId,
      get().nodes,
      get().edges
    );
    let newNode = {
      id: nodeData.nodeId,
      type: 'add',
      position,
      data: {
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
      },
    };
    let { nodes, edges } = getLayoutedElements({
      nodes: [...newNodes, newNode],
      edges: [...newEdges],
    });
    set({ nodes, edges });
  },
  removeWebhookNode: nodeData => {
    let { newNodes, newEdges } = deleteChildElementsRecursively(
      nodeData.nodeId,
      get().nodes,
      get().edges
    );
    let newNode = {
      id: nodeData.nodeId,
      type: 'add',
      position,
      data: {
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
      },
    };
    let { nodes, edges } = getLayoutedElements({
      nodes: [...newNodes, newNode],
      edges: [...newEdges],
    });
    set({ nodes, edges });
  },
  removeSpeakNode: nodeData => {
    let { newNodes, newEdges } = deleteChildElementsRecursively(
      nodeData.nodeId,
      get().nodes,
      get().edges
    );
    let newNode = {
      id: nodeData.nodeId,
      type: 'add',
      position,
      data: {
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
      },
    };
    let { nodes, edges } = getLayoutedElements({
      nodes: [...newNodes, newNode],
      edges: [...newEdges],
    });
    set({ nodes, edges });
  },
  removeProcessorNode: nodeData => {
    let { newNodes, newEdges } = deleteChildElementsRecursively(
      nodeData.nodeId,
      get().nodes,
      get().edges
    );
    let newNode = {
      id: nodeData.nodeId,
      type: 'add',
      position,
      data: {
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
      },
    };
    let { nodes, edges } = getLayoutedElements({
      nodes: [...newNodes, newNode],
      edges: [...newEdges],
    });
    set({ nodes, edges });
  },
  removeTransferNode: nodeData => {
    let newNode = {
      id: nodeData.nodeId,
      type: 'add',
      position,
      data: {
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
      },
    };
    let { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        newNode,
      ],
      edges: [...get().edges],
    });
    set({ nodes, edges });
  },
  removeTerminateNode: nodeData => {
    // deleteElementsRecursively(nodeData.nodeId, get().nodes, get().edges);
    let newNode = {
      id: nodeData.nodeId,
      type: 'add',
      position,
      data: {
        nodeId: nodeData.nodeId,
        parentNodeId: nodeData.parentNodeId,
      },
    };
    let { nodes, edges } = getLayoutedElements({
      nodes: [
        ...get().nodes.filter(node => node.id !== nodeData.nodeId),
        newNode,
      ],
      edges: [...get().edges],
    });
    set({ nodes, edges });
  },
  setAudioFiles: audioFiles => {
    set({
      audioFiles,
    });
  },
}));

export default useStore;
