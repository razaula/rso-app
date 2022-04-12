import React from "react";

class University extends React.Component {

  constructor() {
    super()

    this.state = {
      name: "",
      website: "",
      desc: "",
      students: "",
      alert: "",
      refresh: -1,
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id")
    };
  }

  render() {
    return (
      <div>
        <form className="card border-3">
          <div className="card-header">
            <h1 className="text-center text-muted mb-0">Found a University</h1>
          </div>

          <div className="container w-75 p-3">
            <div className="form-outline mt-5 mb-3">
              <input onChange={this.handleName} id="name" className="form-control" placeholder="Name"/>
            </div>

            <div className="form-outline mb-3">
              <input onChange={this.handleWeb} id="web" className="form-control" placeholder="Website"/>
            </div>

            <div className="form-outline mb-3">
              <textarea onChange={this.handleDesc} id="desc" className="form-control" placeholder="Description"/>
            </div>

            <div className="form-outline mb-3">
              <input onChange={this.handleStudents} id="numStudents" className="form-control" type="number" min="1" placeholder="Number of Students"/>
            </div>

            <div className="row mb-4">
               <button onClick={this.handleSubmit} className="btn btn-outline-primary rounded-pill" type="button">
                 Create
              </button>
            </div>

            <div className="text-center">
              <p className="text-primary">{this.state.alert}</p>
            </div>

            <meta httpEquiv="refresh" content={this.state.refresh}/>
          </div>
        </form>
      </div>
    );
  }

  handleName = (e) => {
    this.setState({name: e.target.value});
  };

  handleWeb = (e) => {
    this.setState({website: e.target.value});
  };

  handleDesc = (e) => {
    this.setState({desc: e.target.value});
  };

  handleStudents = (e) => {
    this.setState({students: e.target.value});
  };

  postUni = async () => {
    const msg = {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token},
      body: JSON.stringify({
        name: this.state.name,
        website: this.state.website,
        description: this.state.desc,
        numStudents: this.state.students,
        user_id: this.state.user_id
      })
    };

    const post = await fetch("/university", msg);
    const res = await post.json()
    return res;
  };

  handleSubmit = async (e) => {
    const res = await this.postUni();

    console.log(res)

    if (res.err)
      this.setState({alert: res.err})
      
      if (res.err.message)
        this.setState({alert: res.err.message});

    if (res.response) {
      this.setState({alert: "Created university", refresh: 1});
    }
  };
}

export default University;
