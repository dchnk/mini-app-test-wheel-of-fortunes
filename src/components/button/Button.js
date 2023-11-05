function Button({content, onClick, className, isLoading}) {
  return (
    <div className={isLoading ? (`button__container button_disabled ${className}`) : (`button__container ${className}`)}>
      <button  className={isLoading ? ("button button_disabled") : ("button") } type='button' onClick={onClick} disabled={isLoading}><p className="button__content">{content}</p></button> 
    </div>
    
  );
}

export default Button;