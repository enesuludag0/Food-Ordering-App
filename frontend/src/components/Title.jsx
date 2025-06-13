import React from "react";

const Title = ({
  title1,
  title2,
  titleStyles,
  title1Styles,
  descriptionStyles
}) => {
  return (
    <div className={`${titleStyles} pb-1`}>
      <h2 className={`${title1Styles} h2`}>
        {title1}
        <span className="text-secondary !font-light"> {title2}</span>
      </h2>
      <p className={`${descriptionStyles} hidden`}>
        Yemeklerimiz, üstün lezzet ve kalite sunmak için en kaliteli <br />
        malzemelerle hazırlanır.
      </p>
    </div>
  );
};

export default Title;
