import React from 'react';
import { useParams } from 'react-router-dom';
// lets us use the params from the url to get more information based on that id
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  const { id: thoughtId } = useParams();
  // console.log(thoughtId);
  
  const { loading, data } = useQuery(QUERY_THOUGHTS, {
    variables: { id: thoughtId }
    // pass in the params we got in earlier, to become a query in GraphQL
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading.......!</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
