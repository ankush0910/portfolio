import Styles from "../styles/Body.module.css";
import Image from "next/dist/client/image";
const Work =()=>{
    return(
        <section>
            <div>
                <div className="d-flex align-items-center justify-content-center position-relative">
                   <Image src="/bg-callout.jpg" className="img-fluid" height={1080} width={1920} />
                   <h2 class=" text-center fw-bold fs-1 position-absolute">
                    Welcome to
                    <em> your </em><br></br>
                    next website!
                   </h2>
                   <a href="#" className="btn  p-2  position-absolute" style={{ backgroundColor:'#1D809F', color:'#ffffff', marginTop:'124px'}}>Download Now</a>
                </div>
            </div>
        </section>
    );
};
export default Work;