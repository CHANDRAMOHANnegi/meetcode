import { Topic } from "@/types";

// Enhanced Data with Images and Problem Links
export const algorithmData: { topics: Topic[] } = {
  topics: [
    {
      id: "graph",
      title: "Graph Algorithms",
      description: "Master graph traversal, shortest paths, and connectivity algorithms",
      difficulty: "medium",
      estimatedTime: "2-3 weeks",
      subtopics: [
        {
          id: "dfs",
          title: "Depth-First Search",
          difficulty: "easy",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          category: "Traversal",
          problemsSolved: [
            "Find connected components",
            "Detect cycles in graphs",
            "Path finding in mazes",
            "Topological sorting"
          ],
          images: [
            {
              id: "dfs-1",
              title: "DFS Tree Traversal",
              description: "Hand-drawn example of DFS on a binary tree",
              category: "diagram",
              url: "/images/graph/dfs-diagram.jpg"
            },
            {
              id: "dfs-2",
              title: "DFS vs BFS Notes",
              description: "My comparison notes between DFS and BFS",
              category: "notes",
              url: "/images/graph/dfs-comparison-notes.jpg"
            }
          ],
          problemLinks: [
            {
              title: "Number of Islands",
              url: "https://leetcode.com/problems/number-of-islands/",
              platform: "leetcode",
              difficulty: "medium",
              description: "Classic DFS problem for finding connected components"
            },
            {
              title: "Path Sum",
              url: "https://leetcode.com/problems/path-sum/",
              platform: "leetcode",
              difficulty: "easy",
              description: "Tree DFS to find if path with target sum exists"
            },
            {
              title: "Course Schedule",
              url: "https://leetcode.com/problems/course-schedule/",
              platform: "leetcode",
              difficulty: "medium",
              description: "Cycle detection using DFS"
            }
          ],
          article: {
            overview: "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (either explicitly or through recursion) to keep track of vertices to visit next.",
            algorithm: "1. Start at a source vertex and mark it as visited\n2. For each unvisited neighbor, recursively apply DFS\n3. Backtrack when no unvisited neighbors remain\n4. Continue until all reachable vertices are visited",
            implementation: `function dfs(graph: number[][], start: number): number[] {\n  const visited = new Set<number>();\n  const result: number[] = [];\n  \n  function dfsHelper(vertex: number) {\n    visited.add(vertex);\n    result.push(vertex);\n    \n    for (const neighbor of graph[vertex]) {\n      if (!visited.has(neighbor)) {\n        dfsHelper(neighbor);\n      }\n    }\n  }\n  \n  dfsHelper(start);\n  return result;\n}`,
            examples: [
              "Finding all nodes in a connected component",
              "Checking if a path exists between two nodes"
            ],
            commonMistakes: [
              "Forgetting to mark vertices as visited",
              "Not handling disconnected components"
            ]
          }
        },
        {
          id: "bfs",
          title: "Breadth-First Search",
          difficulty: "easy",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          category: "Traversal",
          problemsSolved: [
            "Find shortest path in unweighted graphs",
            "Level-order traversal",
            "Find minimum steps to reach target"
          ],
          images: [
            {
              id: "bfs-1",
              title: "BFS Queue Visualization",
              description: "Step-by-step BFS execution with queue operations",
              category: "diagram",
              url: "/images/graph/bfs-queue-diagram.jpg"
            }
          ],
          problemLinks: [
            {
              title: "Binary Tree Level Order Traversal",
              url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
              platform: "leetcode",
              difficulty: "medium",
              description: "Classic BFS application for level-order traversal"
            },
            {
              title: "Rotting Oranges",
              url: "https://leetcode.com/problems/rotting-oranges/",
              platform: "leetcode",
              difficulty: "medium",
              description: "Multi-source BFS problem"
            }
          ],
          article: {
            overview: "Breadth-First Search (BFS) explores vertices level by level, visiting all neighbors of a vertex before moving to vertices at the next level. It uses a queue to maintain the order of exploration.",
            algorithm: "1. Start at source vertex, add to queue and mark as visited\n2. While queue is not empty:\n   - Dequeue a vertex\n   - For each unvisited neighbor, mark as visited and enqueue\n3. Continue until queue is empty",
            implementation: `function bfs(graph: number[][], start: number): number[] {\n  const visited = new Set<number>();\n  const queue: number[] = [start];\n  const result: number[] = [];\n  \n  visited.add(start);\n  \n  while (queue.length > 0) {\n    const vertex = queue.shift()!;\n    result.push(vertex);\n    \n    for (const neighbor of graph[vertex]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  \n  return result;\n}`,
            examples: [
              "Finding shortest path in unweighted graph",
              "Level-order tree traversal"
            ],
            commonMistakes: [
              "Using stack instead of queue",
              "Not marking vertices as visited when enqueueing"
            ]
          }
        }
      ]
    }
  ]
};
