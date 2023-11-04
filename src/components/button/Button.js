function Button({content, onClick, className}) {
  return (
    <div className={`button__container ${className}`}>
      <button  className="button" type='button' onClick={onClick}><p className="button__content">{content}</p></button> 
    </div>
    
  );
}

export default Button;