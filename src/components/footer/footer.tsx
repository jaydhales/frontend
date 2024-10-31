import FeedBackForm from "./feedbackForm";

export default function Footer() {
  return (
    <div className="flex  flex-grow items-end px-[16px] py-[24px]">
      <div>
        <FeedBackForm />
        <nav className="flex gap-x-4 text-[14px] text-muted-foreground ">
          <a className="hover:text-white" href="">
            About
          </a>
          <a className="hover:text-white" href="">
            Roadmap
          </a>
          <a className="hover:text-white" href="">
            Whitepaper
          </a>
        </nav>
      </div>
    </div>
  );
}
