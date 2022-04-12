import Image from "next/dist/client/image";
import Styles from "../styles/Body.module.css";
import Navbar from "./navbar";

const Body=()=>{
    return(
        
            <section>
            <div>
                <div className="d-flex align-items-center justify-content-center position-relative">
                   <Image src="/bg-masthead.jpg" className="img-fluid" height={940} width={1920} />
                   <h1 className={`${Styles.po} position-absolute fw-bold fs-1`}>MY PORTFOLIO</h1>  
                   <a href="#" className="position-absolute  btn  p-3 mt-5" style={{ backgroundColor:'#1D809F', color:'#ffffff'}}>Find out More</a>
                   
                </div>
                

            </div>
        </section>
        
        
    );
};
export default Body;