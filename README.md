## Moved abort request from App component logic to service api class  

**Technical task**  
Implement functional React component which will render the list of products.

Details:
+ Display title "Product list"
+ Implement ability to retrieve list of products from the remote OData Service (see URL below)
+ Display the list of Product names in column
+ In case there are no Products - display "No data to display"
+ When data is loading display "Loading..."
+ Add ability to search for the products via input (research how to do this in OData service)
+ When multiple search requests are sent the last one should be cancelled after new one is fired

Attachments:
[Endpoint with real data](https://services.odata.org/Experimental/OData/OData.svc/Products)