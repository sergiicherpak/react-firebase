import React, { useState, useEffect, useCallback, useContext } from "react";

import Header from "../layouts/Header";
import { Tabs, TabItem } from "../components/Tabs";
import { Bulk } from "../components/Bulk";
import { OverView } from "../components/OverView";
import firebase from "../firebase";
import { UserContext } from "../App";

const DashboardAccount = () => {
  const [queryData, setQueryData] = useState([]);
  const [collection, setCollection] = useState(null);
  const [postedData, setPostedData] = useState([]);
  const userId = useContext(UserContext);

  useEffect(() => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
      merge: true
    });

    setCollection(db.collection("Feed"));
  }, []);

  const getData = useCallback(() => {
    if (collection) {
      collection.get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        setQueryData(data);
      });
    }
  }, [collection]);

  const savePosts = useCallback((posts) => {
    let data = [];
    posts.forEach(post => {
      const request = Object.assign({}, post);
      request["comments"] = [];
      request["creationDate"] = post.creationDate.toISOString();
      request["creationTimeStamp"] = post.creationDate.toDateString();
      request["keywords"] = [];
      request["likes"] = [];
      request["postType"] = "";
      request["userID"] = userId;

      data.push(request);
      collection.add(request).then((result) => {})
    })

    setPostedData(data);
  }, [collection, userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="dashboard-account-page">
      <Header />
      <Tabs defaultIndex={1}>
        <TabItem title="overview auto posts" index={1}>
          <OverView key="overview-1" data={queryData} collection={collection} getData={getData} mode={1} />
        </TabItem>
        <TabItem title="bulk-auto-posting" index={2}>
          <Bulk savePosts={savePosts} />
        </TabItem>
        <TabItem title="posted" index={3}>
          <OverView key="overview-2" data={postedData} collection={collection} mode={2}/>
        </TabItem>
      </Tabs>
    </div>
  )
}

export default DashboardAccount;