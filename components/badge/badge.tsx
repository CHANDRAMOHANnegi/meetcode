// Components
export const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
  const colors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[difficulty as keyof typeof colors]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
};

export const PlatformBadge: React.FC<{ platform: string }> = ({ platform }) => {
  const colors = {
    leetcode: 'bg-orange-100 text-orange-800',
    hackerrank: 'bg-green-100 text-green-800',
    codeforces: 'bg-blue-100 text-blue-800',
    geeksforgeeks: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[platform as keyof typeof colors]}`}>
      {platform}
    </span>
  );
};
