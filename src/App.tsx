import { useState } from "react";
import Vocabulary from "./components/Vocabulary";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
function App() {
  const words = ["Prominent", "Ephemeral", "Serendipity", "Luminous"];
  const fonts = [
    "Oswald",
    "Sacramento",
    "Pacifico",
    "Raleway"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [definition, setDefinition] = useState("Definition");
  const [example, setExample] = useState("Example");

  const handlePrevClick = async () => {
    const nextIndex = currentIndex === 0 ? words.length - 1 : currentIndex - 1;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? words.length - 1 : prevIndex - 1
    );
    await fetchDefinition(words[nextIndex]);
    await fetchExample(words[nextIndex]);
  };

  const handleNextClick = async () => {
    const nextIndex = currentIndex === words.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex((prevIndex) =>
      prevIndex === words.length - 1 ? 0 : prevIndex + 1
    );
    await fetchDefinition(words[nextIndex]);
    await fetchExample(words[nextIndex]);
  };

  const fetchDefinition = async (word: string) => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    setDefinition(data[0].meanings[0].definitions[0].definition);
  };

  const fetchExample = async (word: string) => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    console.log(data[0])
    setExample(data[0].meanings[0].definitions[0].example);
  };

  return (
    <>
      <div className="h-screen w-screen  bg-slate-200 flex items-center justify-center">
        <div className="grid grid-cols-3 max-w-7xl w-full">
          <div
            className="flex items-center justify-center text-4xl text-slate-400 hover:text-slate-500"
            onClick={handlePrevClick}

          >
            <BsChevronCompactLeft />
          </div>
          <AnimatePresence mode='wait'>
            <motion.div key={words[currentIndex]} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}>
            <Vocabulary
              word={words[currentIndex]}
              font={fonts[currentIndex]}
              definition={definition}
              example={example}
            />

            </motion.div>
          </AnimatePresence>
          
          <div
            className="flex items-center justify-center text-4xl text-slate-400  hover:text-slate-800 transition duration-100 cursor-pointer"
            onClick={handleNextClick}
          >
            <BsChevronCompactRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
