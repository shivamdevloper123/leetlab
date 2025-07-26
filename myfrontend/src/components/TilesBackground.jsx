const TilesBackground = ({ rows = 8, cols = 50 }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="w-full h-full grid grid-rows-[repeat(20,_minmax(0,_1fr))] grid-cols-8 gap-px opacity-20">
        {[...Array(rows * cols)].map((_, i) => (
          <div key={i} className="bg-base-content/10 backdrop-blur-sm" />
        ))}
      </div>
    </div>
  );
};

export default TilesBackground;
