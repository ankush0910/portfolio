import Styles from '../styles/Body.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileButton, faPencil, faThumbsUp, faQuestion } from "@fortawesome/free-solid-svg-icons";
const Service=()=>{
    return(
        <section style={{backgroundColor:'#1D809F'}}>
            <div className="container-fluid py-5" >
                <div className="d-flex justify-content-center align-content-center flex-column " style={{backgroundColor:'#1D809F'}}>
                     <h3 className="text-warning text-center fs-6 fw-bold mt-5">SERVICES</h3>
                     <h2 className="text-center fw-bold text-light fs-1">What We Offer</h2>
                </div>
                
                <div className=" d-flex flex-wrap justify-content-center   mb-5" style={{backgroundColor:'#1D809F'}}>
                    <div className="card bg-info border-0" >
                        <div className="card-body" style={{backgroundColor:'#1D809F'}}>
                        <span className= {`${Styles.mai} bg-light d-block rounded-circle mb-2  mx-auto`}>
                             <FontAwesomeIcon
                             icon={faMobileButton}
                             className="fs-1"
                             />
                        </span>
                        <h4 className='text-center'><strong>Responsive</strong></h4>
                          <p className="card-text text-center">Looks great on any screen size!.</p>
                        </div>
                    </div>
                    <div className="card bg-info border-0">
                        <div className="card-body"style={{backgroundColor:'#1D809F'}}>
                        <span className= {`${Styles.mai} bg-light d-block rounded-circle mb-2  mx-auto `}>
                             <FontAwesomeIcon
                             icon={faPencil}
                             className="fs-1"
                             />
                        </span>
                            <h4 className=' text-center'><strong>Redesined</strong></h4>
                             <p className="text-faded text-center">Freshly redesigned for Bootstrap 5.</p>
                        </div>
                    </div>
                    <div className="card bg-info  border-0">
                         <div className="card-body"style={{backgroundColor:'#1D809F'}}>
                        <span className= {`${Styles.mai} bg-light d-block rounded-circle mb-2 mx-auto  `}>
                             <FontAwesomeIcon
                             icon={faThumbsUp}
                             className="fs-1"
                             />
                        </span>
                            <h4 className=' text-center'><strong>Favorited</strong></h4>
                             <p className="text-faded text-center">Millions of users Start Bootstrap! </p>
                         </div>
                    </div> 
                    <div className="card bg-info  border-0">
                         <div className="card-body" style={{backgroundColor:'#1D809F'}}>
                        <span className= {`${Styles.mai} bg-light d-block rounded-circle mb-2 mx-auto  `}>
                             <FontAwesomeIcon
                             icon={faQuestion}
                             className="fs-1"
                             />
                        </span>
                        <h4 className='text-center'><strong>Question</strong></h4>
                        <p className="text-faded text-center">I mustache you a question...</p>
                         </div>
                    </div>
                </div>
            </div>
        </section>

    );
};
export default Service;