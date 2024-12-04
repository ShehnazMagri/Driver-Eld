import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getPlans } from "../../Redux/Action/vehicle";
import { useNavigate } from "react-router-dom";

export const BuyPlan = () => {
  const [plans, setPlans] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch plans from the API
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await dispatch(getPlans()); // Call the API action
        if (fetchedPlans) {
          setPlans(fetchedPlans);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, [dispatch]);

  const handleBuyPlan = (plan) => {
    // Navigate to checkout with selected plan's data
    navigate("/owner/checkout", { state: { plan } });
  };
  // Pricing data
  // const plans = [
  //   {
  //     id: 1,
  //     iconClass: "mdi mdi-account",
  //     title: "Starter",
  //     features: [
  //       { feature: "Unlimited Target Audience", included: true },
  //       { feature: "1 User Account", included: true },
  //       { feature: "100+ Video Tuts", included: false },
  //       { feature: "Public Displays", included: false },
  //     ],
  //     oldPrice: "$9.99",
  //     newPrice: "$8.99",
  //     isFeatured: false,
  //   },
  //   {
  //     id: 2,
  //     iconClass: "mdi mdi-account-multiple",
  //     title: "Personal",
  //     features: [
  //       { feature: "Unlimited Target Audience", included: true },
  //       { feature: "1 User Account", included: true },
  //       { feature: "100+ Video Tuts", included: true },
  //       { feature: "Public Displays", included: false },
  //     ],
  //     oldPrice: "$19.99",
  //     newPrice: "$18.99",
  //     isFeatured: true,
  //   },
  //   {
  //     id: 3,
  //     iconClass: "mdi mdi-account-multiple-plus",
  //     title: "Ultimate",
  //     features: [
  //       { feature: "Unlimited Target Audience", included: true },
  //       { feature: "1 User Account", included: true },
  //       { feature: "100+ Video Tuts", included: true },
  //       { feature: "Public Displays", included: true },
  //     ],
  //     oldPrice: "$29.99",
  //     newPrice: "$28.99",
  //     isFeatured: false,
  //   },
  // ];

  return (
    // <div className="custom-bg py-3 ">
    //   <Container>
    //     <Row className="justify-content-md-center">
    //       <section className="section" id="pricing">
    //         <div className="container">
    //           <div className="row">
    //             <div className="col-lg-12">
    //               <div className="title-box text-center">
    //                 <h3 className="title-heading mt-4">
    //                   Choose the Best Plan for Your Fleet
    //                 </h3>
    //                 <p className="text-muted f-17 mt-3">
    //                   We offer tailored pricing plans to suit every vehicle
    //                   owner’s needs. Whether you manage a single vehicle or an
    //                   entire fleet, our packages provide the best value for
    //                   registration and management. Enjoy seamless tracking,
    //                   hassle-free registration, and efficient management
    //                   options.
    //                   <br />
    //                   Explore our plans and select the one that fits your
    //                   business.
    //                 </p>
    //                 <img
    //                   src="/images/home-border.png"
    //                   height="15"
    //                   className="mt-3"
    //                   alt=""
    //                 />
    //               </div>
    //             </div>
    //           </div>

    //           <div className="row mt-5 pt-4 ">
    //           {/* {plans & plans.length > 0 ? (
    //             plans.map((plan) => (
    //               <div className="col-lg-4" key={plan.id}> */}
    //             {plans.map((plan) => (
    //               <div className="col-lg-4" key={plan.id}>
    //                 <div
    //                   className={`pricing-box mt-4 ${
    //                     plan.isFeatured ? "featured" : ""
    //                   }`}
    //                 >
    //                   {plan.isFeatured && (
    //                     <div className="pricing-badge">
    //                       <span className="badge">Featured</span>
    //                     </div>
    //                   )}
    //                   <i className={`${plan.iconClass} h1`}></i>
    //                   <h4
    //                     className={`f-20 ${
    //                       plan.isFeatured ? "text-primary" : ""
    //                     }`}
    //                   >
    //                     {plan.title}
    //                   </h4>
    //                   <div className="mt-4 pt-2">
    //                     <p className="mb-2 f-18">Features</p>
    //                     {plan.features.map((feature, index) => (
    //                       <p className="mb-2" key={index}>
    //                         <i
    //                           className={`mdi ${
    //                             feature.included
    //                               ? "mdi-checkbox-marked-circle text-success"
    //                               : "mdi-close-circle text-danger"
    //                           } f-18 mr-2`}
    //                         ></i>
    //                         <b>{feature.feature}</b>
    //                       </p>
    //                     ))}
    //                   </div>

    //                   <p className="mt-4 pt-2 text-muted">
    //                     Semper urna veal tempus pharetra elit habisse platea
    //                     dictumst.
    //                   </p>
    //                   <div className="pricing-plan mt-4 pt-2">
    //                     <h4 className="text-muted">
    //                       <s>{plan.oldPrice}</s>
    //                       <span className="plan pl-3 text-dark">
    //                         {plan.newPrice}
    //                       </span>
    //                     </h4>
    //                     <p className="text-muted mb-0">Per Month</p>
    //                   </div>

    //                   <div className="mt-4 pt-3">
    //                     <a href="#" className="btn btn-primary btn-rounded">
    //                       Buy Plan
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </section>
    //     </Row>
    //   </Container>
    // </div>
    <div className="custom-bg py-3 ">
  <Container>
    <Row className="justify-content-md-center">
      <section className="section" id="pricing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-box text-center">
                <h3 className="title-heading mt-4">
                  Choose the Best Plan for Your Fleet
                </h3>
                <p className="text-muted f-17 mt-3">
                  We offer tailored pricing plans to suit every vehicle
                  owner’s needs. Whether you manage a single vehicle or an
                  entire fleet, our packages provide the best value for
                  registration and management. Enjoy seamless tracking,
                  hassle-free registration, and efficient management
                  options.
                  <br />
                  Explore our plans and select the one that fits your
                  business.
                </p>
                <img
                  src="/images/home-border.png"
                  height="15"
                  className="mt-3"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="row mt-5 pt-4">
            {plans && plans.length > 0 ? (
              plans.map((plan) => (
                <div className="col-lg-4" key={plan.id}>
                  <div
                    className={`pricing-box mt-4 ${
                      plan.isFeatured ? "featured" : ""
                    }`}
                  >
                    {plan.isFeatured && (
                      <div className="pricing-badge">
                        <span className="badge">Featured</span>
                      </div>
                    )}
                    <i className={`${plan.iconClass} h1`}></i>
                    <h4
                      className={`f-20 ${
                        plan.isFeatured ? "text-primary" : ""
                      }`}
                    >
                      {plan.planType}
                    </h4>
                    {/* <p className="mt-2">
                      <i className="mdi mdi-account-multiple f-18 mr-2"></i>
                      <b>Number of Users: {plan.numberOfUsers}</b>
                    </p> */}

                    {/* Static Features Section */}
                    <div className="mt-3">
                      <p className="mb-2 f-18">Features:</p>
                      <p className="mb-2">
                        <i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i>
                        <b>users Permitted : {plan.numberOfUsers}</b>
                      </p>
                      <p className="mb-2">
                        <i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i>
                        <b>24/7 Customer Support</b>
                      </p>
                      <p className="mb-2">
                        <i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i>
                        <b>Data Analytics</b>
                      </p>
                      <p className="mb-2">
                        <i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i>
                        <b>Seamless Integration</b>
                      </p>
                      <p className="mb-2">
                        <i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i>
                        <b>Mobile Access</b>
                      </p>
                      {plan.features && plan.features.length > 0 ? (
                        plan.features.map((feature, index) => (
                          <p className="mb-2" key={index}>
                            <i
                              className={`mdi ${
                                feature.included
                                  ? "mdi-checkbox-marked-circle text-success"
                                  : "mdi-close-circle text-danger"
                              } f-18 mr-2`}
                            ></i>
                            {/* <b>{feature.name}</b> */}
                          </p>
                        ))
                      ) : (
                        <p>No features available</p>
                      )}
                    </div>

                    <div className="pricing-plan mt-4 pt-2">
                      <h4 className="text-muted">
                        {/* <span className="text-muted small-currency"> */}
                        <span className="plan pl-1 text-dark font-weight-bold">
                          {/* {plan.currency} */}$
                        </span>
                        <span className="plan pl-3 text-dark font-weight-bold">
                          {plan.price}
                        </span>
                      </h4>
                      <p className="text-muted mb-0">Yearly</p>
                    </div>

                    <div className="mt-4 pt-3">
                          <button
                            className="btn btn-primary btn-rounded"
                            onClick={() => handleBuyPlan(plan)} // Handle buy plan click
                          >
                            Buy Plan
                          </button>
                        </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No plans available</p>
            )}
          </div>
        </div>
      </section>
    </Row>
  </Container>
</div>

    // <div className="custom-bg py-3 ">
    //   <Container>
    //     <Row className="justify-content-md-center">
    //       <section className="section" id="pricing">
    //         <div className="container">
    //           <div className="row">
    //             <div className="col-lg-12">
    //               <div className="title-box text-center">
    //                 <h3 className="title-heading mt-4">
    //                   Choose the Best Plan for Your Fleet
    //                 </h3>
    //                 <p className="text-muted f-17 mt-3">
    //                   We offer tailored pricing plans to suit every vehicle
    //                   owner’s needs. Whether you manage a single vehicle or an
    //                   entire fleet, our packages provide the best value for
    //                   registration and management. Enjoy seamless tracking,
    //                   hassle-free registration, and efficient management
    //                   options.
    //                   <br />
    //                   Explore our plans and select the one that fits your
    //                   business.
    //                 </p>
    //                 <img
    //                   src="/images/home-border.png"
    //                   height="15"
    //                   className="mt-3"
    //                   alt=""
    //                 />
    //               </div>
    //             </div>
    //           </div>

    //           <div className="row mt-5 pt-4">
    //             {plans && plans.length > 0 ? (
    //               plans.map((plan) => (
    //                 <div className="col-lg-4" key={plan.id}>
    //                   <div
    //                     className={`pricing-box mt-4 ${
    //                       plan.isFeatured ? "featured2222" : ""
    //                     }`}
    //                   >
    //                     {plan.isFeatured && (
    //                       <div className="pricing-badge">
    //                         <span className="badge">Featured</span>
    //                       </div>
    //                     )}
    //                     <i className={`${plan.iconClass} h1`}></i>
    //                     <h4
    //                       className={`f-20 ${
    //                         plan.isFeatured ? "text-primary" : ""
    //                       }`}
    //                     >
    //                       {plan.planType}
    //                     </h4>
    //                     <p className="mt-2">
    //                       <i className="mdi mdi-account-multiple f-18 mr-2"></i>
    //                       <b>Number of Users: {plan.numberOfUsers}</b>{" "}
    //                     </p>
    //                     <p className="mb-2">
    //                       <b> No Of Users : {plan.numberOfUsers}</b>
    //                     </p>
    //                     {/* <div className="pricing-plan mt-4 pt-2">
    //                       <h4 className="text-muted">
    //                         <span className="plan pl-3 text-dark">
    //                           ${plan.price || "$80"}
    //                         </span>
    //                       </h4>
    //                       <p className="text-muted mb-0">Yearly</p>
    //                     </div> */}
    //                     <div className="pricing-plan mt-4 pt-2">
    //                       <h4 className="text-muted">
    //                         <span className="text-muted small-currency">
    //                           {plan.currency}
    //                         </span>
    //                         <span className="plan pl-3 text-dark font-weight-bold">
    //                           {plan.price}
    //                         </span>
    //                       </h4>
    //                       <p className="text-muted mb-0">Yearly</p>
    //                     </div>

    //                     <div className="mt-4 pt-3">
    //                       <a href="/owner/checkout" className="btn btn-primary btn-rounded">
    //                         Buy Plan
    //                       </a>
    //                     </div>
    //                   </div>
    //                 </div>
    //               ))
    //             ) : (
    //               <p>No plans available</p>
    //             )}
    //           </div>
    //         </div>
    //       </section>
    //     </Row>
    //   </Container>
    // </div>
  );
};
