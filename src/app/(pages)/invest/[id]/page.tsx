import TokenInvest from "./tokenInvest";

type Params = Promise<{ id: string }>;

export default async function Invest({ params } : { params: Params }) {
    const { id } = await params || "";
    
    return (
        <div className={`w-full h-full`}>
            <TokenInvest id={id} />
        </div>
    );
}