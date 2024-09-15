import parse from 'html-react-parser';
import './style.css';

const RenderParsedContent = ({ htmlContent }: any) => {
  return (
    <div className="parsed-html">
      {parse(htmlContent)}
    </div>
  );
};

export default RenderParsedContent;
