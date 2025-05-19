export default function SubmitFormButton({ onClick, isPending, title }) {
  return (
    <button
      className="button-ultraviolet self-end"
      type={onClick ? 'button' : 'submit'}
      disabled={isPending}
      {...(onClick ? { onClick } : null)}
    >
      {title}
    </button>
  );
}
