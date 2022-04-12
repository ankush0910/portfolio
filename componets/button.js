const Button=()=>{
    return(
        <section style={{backgroundColor:'#1D809F'}} >
            <div className=" container">
                <div className="d-flex justify-content-center flex-column flex-lg-wrap  py-5" style={{backgroundColor:'#1D809F'}}>
                     <h1 className="text-light text-center fs-3 fw-bold mt-5">The buttons below are impossible to resist...</h1>
                     <div className=" d-flex justify-content-center my-3">
                     <a href="#" className="btn btn-light btn-sm me-2 px-5 py-4 ">Click Me!</a>
                     <a href="#" className="btn btn-dark btn-sm px-5 py-4  ">Look At Me!</a>
                     </div>
                </div>
               
            </div>
        </section>

    );
};
export default Button;