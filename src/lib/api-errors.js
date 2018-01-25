/**
|--------------------------------------------------
| Check Fetch responses for errors during API calls
|--------------------------------------------------
* 
*  Since the request completes, even with errors, we
*  should check the API response to make sure it
*  really succeeded. If not, let's throw errors.
* 
*/

export function handleApiErrors(response) {
  if (!response.ok) {
    throw Error("An Error Occured");
  }
  return response;
}
