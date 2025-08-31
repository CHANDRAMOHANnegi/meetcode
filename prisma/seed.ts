// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = {
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
            }
          ],
          article: {
            overview: "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.",
            algorithm: "1. Start at a source vertex and mark it as visited\n2. For each unvisited neighbor, recursively apply DFS\n3. Backtrack when no unvisited neighbors remain",
            implementation: "function dfs(graph: number[][], start: number): number[] {\n  const visited = new Set<number>();\n  const result: number[] = [];\n  \n  function dfsHelper(vertex: number) {\n    visited.add(vertex);\n    result.push(vertex);\n    \n    for (const neighbor of graph[vertex]) {\n      if (!visited.has(neighbor)) {\n        dfsHelper(neighbor);\n      }\n    }\n  }\n  \n  dfsHelper(start);\n  return result;\n}",
            examples: ["Finding connected components", "Path existence checking"],
            commonMistakes: ["Forgetting to mark visited", "Not handling disconnected components"]
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
            overview: "Breadth-First Search (BFS) explores vertices level by level, visiting all neighbors before moving to the next level.",
            algorithm: "1. Start at source vertex, add to queue and mark as visited\n2. While queue is not empty:\n   - Dequeue a vertex\n   - For each unvisited neighbor, mark as visited and enqueue",
            implementation: "function bfs(graph: number[][], start: number): number[] {\n  const visited = new Set<number>();\n  const queue: number[] = [start];\n  const result: number[] = [];\n  \n  visited.add(start);\n  \n  while (queue.length > 0) {\n    const vertex = queue.shift()!;\n    result.push(vertex);\n    \n    for (const neighbor of graph[vertex]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  \n  return result;\n}",
            examples: ["Shortest path in unweighted graph", "Level-order traversal"],
            commonMistakes: ["Using stack instead of queue", "Not marking when enqueueing"]
          }
        },
        {
          id: "dijkstra",
          title: "Dijkstra's Algorithm",
          difficulty: "medium",
          timeComplexity: "O((V + E) log V)",
          spaceComplexity: "O(V)",
          category: "Shortest Path",
          problemsSolved: [
            "Find shortest path in weighted graphs",
            "GPS navigation systems",
            "Network routing protocols"
          ],
          images: [
            {
              id: "dijkstra-1",
              title: "Dijkstra Step-by-Step",
              description: "Manual execution of Dijkstra's algorithm",
              category: "example",
              url: "/images/graph/dijkstra-steps.jpg"
            }
          ],
          problemLinks: [
            {
              title: "Network Delay Time",
              url: "https://leetcode.com/problems/network-delay-time/",
              platform: "leetcode",
              difficulty: "medium",
              description: "Classic Dijkstra shortest path problem"
            },
            {
              title: "Cheapest Flights Within K Stops",
              url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
              platform: "leetcode",
              difficulty: "medium",
              description: "Modified Dijkstra with constraints"
            }
          ],
          article: {
            overview: "Dijkstra's algorithm finds the shortest path from a source to all vertices in a weighted graph with non-negative weights.",
            algorithm: "1. Initialize distances to infinity, source to 0\n2. Use priority queue for minimum distance vertex\n3. For each neighbor, calculate new distance\n4. Update if shorter path found",
            implementation: "interface Edge { to: number; weight: number; }\n\nfunction dijkstra(graph: Edge[][], start: number): number[] {\n  const distances = new Array(graph.length).fill(Infinity);\n  const pq = [{vertex: start, distance: 0}];\n  distances[start] = 0;\n  \n  while (pq.length > 0) {\n    pq.sort((a, b) => a.distance - b.distance);\n    const {vertex, distance} = pq.shift()!;\n    \n    if (distance > distances[vertex]) continue;\n    \n    for (const edge of graph[vertex]) {\n      const newDist = distances[vertex] + edge.weight;\n      if (newDist < distances[edge.to]) {\n        distances[edge.to] = newDist;\n        pq.push({vertex: edge.to, distance: newDist});\n      }\n    }\n  }\n  \n  return distances;\n}",
            examples: ["GPS shortest route", "Network packet routing"],
            commonMistakes: ["Using with negative weights", "Not using priority queue"]
          }
        }
      ]
    }
  ]
};

async function main() {
  console.log('🌱 Seeding database...');

  for (const topicData of seedData.topics) {
    // Create topic
    const topic = await prisma.topic.upsert({
      where: { id: topicData.id },
      update: {
        title: topicData.title,
        description: topicData.description,
        difficulty: topicData.difficulty,
        estimatedTime: topicData.estimatedTime,
      },
      create: {
        id: topicData.id,
        title: topicData.title,
        description: topicData.description,
        difficulty: topicData.difficulty,
        estimatedTime: topicData.estimatedTime,
      }
    });

    console.log(`✅ Created topic: ${topic.title}`);

    // Create algorithms
    for (const algorithmData of topicData.subtopics) {
      const algorithm = await prisma.algorithm.upsert({
        where: { id: algorithmData.id },
        update: {
          title: algorithmData.title,
          difficulty: algorithmData.difficulty,
          timeComplexity: algorithmData.timeComplexity,
          spaceComplexity: algorithmData.spaceComplexity,
          category: algorithmData.category,
          problemsSolved: algorithmData.problemsSolved,
          articleContent: algorithmData.article,
        },
        create: {
          id: algorithmData.id,
          title: algorithmData.title,
          difficulty: algorithmData.difficulty,
          timeComplexity: algorithmData.timeComplexity,
          spaceComplexity: algorithmData.spaceComplexity,
          category: algorithmData.category,
          problemsSolved: algorithmData.problemsSolved,
          articleContent: algorithmData.article,
          topicId: topic.id,
        }
      });

      console.log(`  ✅ Created algorithm: ${algorithm.title}`);

      // Delete existing images and problem links for this algorithm
      await prisma.algorithmImage.deleteMany({
        where: { algorithmId: algorithm.id }
      });
      await prisma.problemLink.deleteMany({
        where: { algorithmId: algorithm.id }
      });

      // Create images
      for (const imageData of algorithmData.images || []) {
        await prisma.algorithmImage.create({
          data: {
            title: imageData.title,
            description: imageData.description,
            category: imageData.category,
            url: imageData.url,
            filename: imageData.url.split('/').pop() || '',
            algorithmId: algorithm.id,
          }
        });
      }

      // Create problem links
      for (const problemData of algorithmData.problemLinks || []) {
        await prisma.problemLink.create({
          data: {
            title: problemData.title,
            url: problemData.url,
            platform: problemData.platform,
            difficulty: problemData.difficulty,
            description: problemData.description,
            algorithmId: algorithm.id,
          }
        });
      }
    }
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });