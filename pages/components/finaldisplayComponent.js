
export default function Post  ({postData}) {

    return (
        <>
            <h2>This is {postData}</h2>
        </>

    );
}

export async function getServerSideProps({ params }) {
    
    var temp = "Hello Testing"

    console.log( param );

    return {
      props: {
        params
      }
    }
}
