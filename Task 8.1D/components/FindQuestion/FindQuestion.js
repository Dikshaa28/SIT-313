import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import QuestionCard from "./QuestionCard";
import "./FindQuestion.css";

function FindQuestion() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        postsData.push({ 
          id: doc.id, 
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date()
        });
      });
      setPosts(postsData);
      setFilteredPosts(postsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = posts;
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (tagFilter) {
      filtered = filtered.filter(post =>
        post.tags && post.tags.some(tag =>
          tag.toLowerCase().includes(tagFilter.toLowerCase())
        )
      );
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter(post => post.type === typeFilter);
    }
    setFilteredPosts(filtered);
  }, [posts, searchTerm, tagFilter, typeFilter]);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", postId));
    }
  };

  const handleExpandPost = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="find-page">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by tag..."
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="question">Questions</option>
          <option value="article">Articles</option>
        </select>
      </div>

      <div className="card-grid">
        {filteredPosts.map(post => (
          <QuestionCard
            key={post.id}
            post={post}
            isExpanded={expandedPost === post.id}
            onExpand={() => handleExpandPost(post.id)}
            onDelete={() => handleDeletePost(post.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default FindQuestion;
