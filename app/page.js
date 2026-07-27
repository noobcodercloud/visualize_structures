import Link from "next/link";

const dataStructures = {
  Linear: ["Array", "Linked List", "Stack", "Queue"],
  "Non-Linear": ["Trees", "Graphs"],
};

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="border-b bg-gray-950/10 border-gray-800">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-gray-100">
            DSA Visualizer
          </h1>
          <p className="mt-1 text-gray-400">
            Data Structures & Algorithms
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-3 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Structures */}
        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-5">
            Data Structures
          </h2>

          {Object.entries(dataStructures).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                {category}
              </h3>

              <div className="border border-gray-800 rounded-md overflow-hidden">
                {items.map((item) => (
                  <Link
                    key={item}
                    href={`/data-structures/${slugify(item)}`}
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-800/50 transition-colors border-b border-gray-800 last:border-b-0"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Algorithms */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-5 text-amber-400">
            Algorithms
          </h2>

          <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
            Coming soon...
          </div>
        </div>
      </main>
    </div>
  );
}