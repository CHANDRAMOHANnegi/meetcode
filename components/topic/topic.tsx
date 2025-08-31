import { Topic } from "@/types";
import { ArrowLeft, Clock, ExternalLink, Image, Zap } from "lucide-react";
import { DifficultyBadge } from "../badge/badge";


export const TopicPage: React.FC<{
    topic: Topic;
    onBack: () => void;
    onSubtopicSelect: (subtopicId: string) => void;
}> = ({ topic, onBack, onSubtopicSelect }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Topics
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
                    <p className="text-gray-600 mt-1">{topic.description}</p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="grid md:grid-cols-2 gap-6">
                    {topic.subtopics.map((subtopic) => (
                        <div
                            key={subtopic.id}
                            onClick={() => onSubtopicSelect(subtopic.id)}
                            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-semibold text-gray-900">{subtopic.title}</h3>
                                <DifficultyBadge difficulty={subtopic.difficulty} />
                            </div>

                            <div className="space-y-3">
                                <div className="text-sm text-gray-500">
                                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                        {subtopic.category}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Clock className="w-3 h-3" />
                                        {subtopic.timeComplexity}
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Zap className="w-3 h-3" />
                                        {subtopic.spaceComplexity}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Image className="w-3 h-3" />
                                        {subtopic.images.length} images
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ExternalLink className="w-3 h-3" />
                                        {subtopic.problemLinks.length} problems
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
