export default function Chapter() {
  return (
    <div className="flex h-full">
      <aside className="w-60 bg-gray-800 p-5 text-white">
        <nav className="mt-32">
          {[
            {
              title: 'UNIT 1',
              items: ['Limits and Continuity', 'Introduction to Limits', 'Continuity'],
            },
            {
              title: 'UNIT 2',
              items: ['Derivatives', 'Introduction to Derivatives', 'Derivative Rules', 'Applications of Derivatives'],
            },
            {
              title: 'UNIT 3',
              items: ['Integrals', 'Introduction to Integrals', 'Integral Rules', 'Applications of Integrals'],
            },
            {
              title: 'UNIT 4',
              items: ['Differential Equations', 'Introduction to Differential Equations', 'Solving Differential Equations'],
            },
            {
              title: 'UNIT 5',
              items: ['Applications of Calculus', 'Optimization Problems', 'Related Rates', 'Area and Volume'],
            },
          ].map(({ title, items }) => (
            <div key={title} className="mb-8">
              <h2 className="text-lg font-semibold mb-4">{title}</h2>
              <ul>
                {items.map((item, index) => (
                  <li
                    key={item}
                    className={`mb-2 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-700 ${
                      index === 1 ? 'font-bold bg-gray-700' : ''
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-gray-900 p-8 text-white">
        <div className="mt-32">
          <h1 className="text-3xl font-bold mb-4">UNIT 1 - CHAPTER 2</h1>
          <h2 className="text-2xl font-semibold">Continuity</h2>
        </div>
        <div className="flex mb-10">
          <div className="flex-1 mr-8">
            <div className="mb-5">
              <div />
            </div>
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <p className="text-lg">
              In this video, we cover the three-step continuity test for functions, how to identify discontinuities,
              and how to work with piecewise functions.
            </p>
          </div>
          <div className="w-96">
            <h3 className="text-xl font-semibold mb-4">Concept Check</h3>
            {[
              {
                question: 'What is the first step of the three-step continuity test?',
                options: [
                  'Show that the function is defined at point a and f(a) exists.',
                  'Show that the function is not continuous at point a.',
                  'Show that the function is undefined at point a.',
                ],
              },
              {
                question: 'What is the second step of the three-step continuity test?',
                options: ['Show that the limit as x approaches a exists.', 'Show that the limit as x approaches a is undefined.'],
              },
            ].map(({ question, options }, questionIndex) => (
              <div key={question} className="mb-6">
                <h4 className="font-semibold mb-4 text-lg">{question}</h4>
                {options.map((option, optionIndex) => (
                  <div key={option} className="mb-4">
                    <label className="flex items-center">
                      <input
                        className="mr-4"
                        id={`option${questionIndex * options.length + optionIndex + 1}`}
                        name={`question${questionIndex + 1}`}
                        type="radio"
                      />
                      <span>{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button className="bg-blue-600 px-6 py-3 rounded-md text-lg font-semibold">Previous</button>
          <button className="bg-blue-600 px-6 py-3 rounded-md text-lg font-semibold">Next</button>
        </div>
      </main>
    </div>
  );
  }