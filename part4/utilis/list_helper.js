const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sumLikes = (a, b) => {
    return a + b.likes;
  };
  return blogs.reduce(sumLikes, 0) || 0;
};

const favouriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((a, b) => (b.likes > a.likes ? b : a));
  const { _id, url, __v, ...blogData } = mostLikes;
  return blogData;
};

const mostBlogs = (blogs) => {
  let dict = {};
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].author in dict) {
      dict[blogs[i].author] += 1;
    } else {
      dict[blogs[i].author] = 1;
    }
  }
  let arr = Object.keys(dict).map((key) => {
    return { author: key, blogs: dict[key] };
  });
  return arr.reduce((a, b) => (a.blogs > b.blogs ? a : b));
};

const mostLikes = (blogs) => {
  let dict = {};
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].author in dict) {
      dict[blogs[i].author] += blogs[i].likes;
    } else {
      dict[blogs[i].author] = blogs[i].likes;
    }
  }
  let arr = Object.keys(dict).map((key) => {
    return { author: key, likes: dict[key] };
  });
  return arr.reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
