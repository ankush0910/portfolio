import Styles from '../styles/Body.module.css';
const Descr =() =>{
    return(
        <section>
            <div className="container-fluid">
                <div className=" d-flex justify-content-center align-content-center flex-column">
                   
                   <h2 className={`${Styles.size} fw-bold p-2 mt-5 text-center`}>Stylish Portfolio is the perfect theme for your next project!</h2>
                   <p className="mb-5 text-center fs-5 fw-light">This theme features a flexible, UX friendly sidebar menu and stock photos from our friends at Unsplash! </p>
                   <a href="#" className=" btn btn-dark align-self-center py-3 px-3  mt-2 mb-5">What We Offer</a>
                </div>

            </div>
        </section>

    );
};
export default Descr;