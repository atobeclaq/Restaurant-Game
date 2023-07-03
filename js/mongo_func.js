// Connection URI
const uri = 'mongodb://localhost:27017';

// Database name
const dbName = 'myDatabase';

// Function to perform database operations
function performDatabaseOperation(operation, collectionName, filterQuery, updateData) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    if (operation === 'update') {
      // Update operation logic
      collection.updateOne(filterQuery, updateData, (error, result) => {
        if (error) {
          console.error('Error updating record:', error);
          client.close();
          return;
        }
        console.log('Successfully updated record');
      });
    } else if (operation === 'retrieve') {
      // Retrieve operation logic
      collection.find(filterQuery).toArray((error, documents) => {
        if (error) {
          console.error('Error retrieving documents:', error);
        } else {
          console.log('Retrieved documents:', documents);
        }
      });
    } else if (operation === 'delete') {
      // Delete operation logic
      collection.deleteOne(filterQuery, (error, result) => {
        if (error) {
          console.error('Error deleting record:', error);
        } else {
          console.log('Successfully deleted record');
        }
      });
    } else {
      console.error('Invalid operation:', operation);
    }

    client.close();
  });
}

// // Call the function to perform a database operation
// const collectionName = 'mycollection';
// const filterQuery = { name: 'John Doe' };
// const updateData = { $set: { age: 35 } };
// performDatabaseOperation('update', collectionName, filterQuery, updateData);
