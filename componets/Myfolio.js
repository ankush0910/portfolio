import Image from "next/dist/client/image";
import Styles from "../styles/Body.module.css";
const Myfolio = () =>{
    return(
        <section className=" py-5">
            <div className=" d-flex flex-column">
                <h4 className=" text-warning text-center fw-bold fs-6 mt-5">PORTFOLIO</h4>
                <h2 className="fs-1 fw-bold text-center">Recent Projects</h2>  
            </div>
            <div className="container  py-5">
                    <div className="d-flex   justify-content-center flex-wrap mx-sm-auto ">
                        <div className={`${Styles.zoomeffectcontainer}`}>
                            <a href="#" className="card border-0">
                                <div className={`${Styles.imagecard} `}>
                                <Image src="/portfolio-1.jpg" className="img-fluid position-absolute" height={467} width={700} />
                                    <div className="card-img-overlay">
                                     <h2 className="card-title ms-3 fw-bold text-light py-auto mt-4" style={{  fontSize: '0.8rem',}}>STATIONARY</h2>
                                     <p className="card-text ms-3 text-light " style={{ fontWeight:'300', fontSize:'1.2rem' }}>A yellow pencil with envelopes on a clean, blue backdrop!.</p>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className={`${Styles.zoomeffectcontainer} `}>
                            <a href="#" className="card border-0">
                                <div className={`${Styles.imagecard}`}>
                                <Image src="/portfolio-2.jpg" className="img-fluid" height={467} width={700} />
                                     <div className="card-img-overlay">
                                     <h2 className="card-title ms-3 fw-bold text-light py-auto mt-4" style={{  fontSize: '0.8rem',}}>ICE CREAM</h2>
                                     <p className="card-text ms-3 text-light " style={{ fontWeight:'300', fontSize:'1.2rem' }}>A dark blue background with a colored pencil, a clip, and a tiny ice cream cone!</p>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className={`${Styles.zoomeffectcontainer} `}>
                            <a href="#" className="card border-0">
                                <div className={`${Styles.imagecard}`}>
                                <Image src="/portfolio-3.jpg" className="img-fluid" height={467} width={700} />
                                    <div className="card-img-overlay">
                                        <h2 className="card-title ms-3 fw-bold text-light py-auto mt-4" style={{  fontSize: '0.8rem',}}>Strawberries</h2>
                                        <p className="card-text ms-3 text-light " style={{ fontWeight:'300', fontSize:'1.2rem' }}>Strawberries are such a tasty snack, especially with a little sugar on top!</p>

                                    </div>      
                                </div>
                            </a>
                        </div>
                        <div className={`${Styles.zoomeffectcontainer}`}>
                            <a href="#" className="card border-0">
                                <div className={`${Styles.imagecard}`}>
                                <Image src="/bg-callout.jpg" className="img-fluid" height={467} width={700} />
                                    <div className="card-img-overlay">
                                        <h2 className="card-title ms-3 fw-bold text-light py-auto mt-4" style={{  fontSize: '0.8rem',}}>Workspace</h2>
                                        <p className="card-text ms-3 text-light " style={{ fontWeight:'300', fontSize:'1.2rem' }}>A yellow workspace with some scissors, pencils, and other objects.</p>

                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    
            </div>
          </section>
    );
};
export default Myfolio;