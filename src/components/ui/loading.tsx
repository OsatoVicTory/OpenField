export const Spinner = ({ className }: { className?: string }) => {
    return (
        <div className={`${className||""} loading-spinner`}></div>
    )
};


export const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div className={`${className||""} Skeleton`}></div>
    );
};