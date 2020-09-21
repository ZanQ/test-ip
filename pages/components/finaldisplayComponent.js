

const Post = function( postData ) {

    return (
        <>
            <h2>{postData}</h2>
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

export { Post };
