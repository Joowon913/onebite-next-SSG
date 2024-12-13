import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css"
import fetchOneBooks from "@/lib/fetch-one-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const book = await fetchOneBooks(Number(id));

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if(!book) return "문제가 발생했습니다 다시 시도하세요";

  const {
    title, 
    subTitle, 
    description, 
    author, 
    publisher, 
    coverImgUrl,
  } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container} 
        style={{ backgroundImage: `url('${coverImgUrl}')`}}>
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>

      <div className={style.description}>{description}</div>
    </div>
  );
}