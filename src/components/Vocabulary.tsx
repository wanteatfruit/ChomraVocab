//type

type VocabularyProps = {
  word: string;
  definition: string;
  example: string;
  font: string;
};

export default function Vocabulary({
  word,
  definition,
  example,
  font
}: VocabularyProps) {
    const heading = `py-8 text-center text-3xl lg:text-6xl`
  return (
    <div>
      <h1 className={heading} style={{fontFamily:font}}>{word}</h1>
      <p className=' text-base lg:text-lg text-center'>{definition}</p>
      <p className='text-lg text-center ' >{example}</p>
    </div>
  );
}
