import { useRouter } from 'next/router';

export default function Main() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/events');
  };
  return (
    <>
      <div className="flex justify-start flex-col gap-[10rem]">
        <h1 className="text-5xl mt-40 font-gloock max-md:text-orange-200 max-md:mt-55">Chata</h1>
        <button
          onClick={handleClick}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow font-gloock text-base"
        >
          Zobrazit udalosti
        </button>
      </div>
    </>
  );
}
