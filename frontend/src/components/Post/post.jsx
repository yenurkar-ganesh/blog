export default function Post(){
  return (
    <div className="post">
      <div className="postImg">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
      </div>

      <div className="postText">
        <h2>Help With Blog </h2>
        <p className="info">
          <a href="" className="author">
            Ganesh Yenurkar
          </a>
          <time>2023-12-27</time>
        </p>
        <p className="summery">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
          voluptatum eveniet magni sed consectetur quos eligendi quod aspernatur
          eaque alias doloribus quaerat voluptas eius omnis esse placeat
          asperiores in, atque unde ut! Cumque, architecto quo dolorem officiis
          odit illo numquam nihil fuga. Fugiat, dicta minus?
        </p>
      </div>
    </div>
  );
}

// export default post;
