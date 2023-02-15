interface ITitleRow {
    heading: string;
    errorMessage: string | undefined;
    error: boolean
    className?: string
}

const TitleRow = ({ heading, errorMessage, error, className}: ITitleRow) => {
    return (
      <div className={`mx-[6px] flex items-center justify-between gap-2 ${className}`}>
        <span className="text-[14px] text-gray-300">{heading}</span>
        {error && (
          <span className="text-[14px] text-red-500">{errorMessage}</span>
        )}
      </div>
    );
}

export default TitleRow