// EditPostRoute.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditPostForm from './EditPostForm';
import { API_URL } from '../utils/consts';

const EditPostRoute = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [postExists, setPostExists] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/posts/${params.postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          setPostExists(true);
        } else {
          setPostExists(false);
          navigate('*');
        }
      })
      .catch((error) => {
        console.error('Error al verificar la existencia del post:', error);
        navigate('*');
      });
  }, [params.postId, navigate]);

  // En caso de q el post q se intenta editar no existe, lo mandamos a a otro lugar
  return postExists ? <EditPostForm /> : null;
};

export default EditPostRoute;