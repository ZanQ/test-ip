import axios from 'axios';

const URL_BASE ='http://localhost/ZanQ/';
const ANON_POST_DETAILS = URL_BASE + 'index.php/Api/Post/PostDetailWithIP';

const getPost = async (id) => {
  //const response = await axios.get(`https://www.mywordpress.com/wp-json/wp/v2/posts?slug=${slug}`);

  const ip = "888.888.888.8888";

  const response = await sendID(ip, id)
        .then((data) => {

            //Success
            if (data['code'] === 1) {

                return (
                        data['data']
                )
            }  
            else {
                var error2 = new Error(data['message']);
                throw error2;
            }  
        })
    .catch(error => console.log(error))

    return (
        response
    );
};

async function sendID (ip, id) {

    if (ip.length > 0) {

        //Data Object to Pass Through
        const DetailRequest = {
            postId: id,
            ip: ip,
        }
    
        //console.log("JSON : " + JSON.stringify(DetailRequest));

        let response = await fetch(ANON_POST_DETAILS, { 
        method: 'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "params=" + JSON.stringify(DetailRequest) + "&developer=1",
        credentials: 'same-origin'
        })
        .then(response => {
                if (response.ok) {
                        return response;
                }
                else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                }
        },
        error => {
                var errorMessage = new Error(error.errorMessage);
                throw errorMessage;
        }) 
    
        let data = await response.json();
        
        return (
            data
        )
    }
}

export default getPost;