import { BookOpen, Clock } from "lucide-react";
import { DifficultyBadge } from "../badge/badge";
import { algorithmData } from "@/data/algo.data";

export const HomePage: React.FC<{ onTopicSelect: (topicId: string) => void }> = ({ onTopicSelect }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">LeetCode Learning Hub</h1>
                    <p className="text-gray-600 mt-1">Master algorithms and data structures</p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="grid gap-6">
                    {algorithmData.topics.map((topic) => (
                        <div
                            key={topic.id}
                            onClick={() => onTopicSelect(topic.id)}
                            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h2>
                                    <p className="text-gray-600 mb-4">{topic.description}</p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {topic.estimatedTime}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" />
                                            {topic.subtopics.length} algorithms
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-4">
                                    <DifficultyBadge difficulty={topic.difficulty} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
