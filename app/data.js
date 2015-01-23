var ServerActionCreators = require('./actions/server-action-creators');

class Data {
  constructor() {
    this.ref = require('./firebase');
    this.user = {};
    this.refs = {};

    this.ref.onAuth(this.authChange.bind(this));
  }

  authChange(authData) {
    this.authData = authData;

    if(authData) {
      this.bindToUser(authData);
    } else {
      this.unbindToUser();
    }
  }

  bindToUser(user) {
    this.userRef = this.ref.child('users/' + user.uid);
    this.userRef.on('value', (dataSnapshot) => {
      var bindToBoards = (boards) => {
        boards.every(board => {
          this.refs[board] = this.ref.child('boards/' + board);
          this.refs[board].on('value', watchBoards);
          return true;
        });
      }

      var watchBoards = (snapshot) => {
        var boardData = snapshot.val();
        boardData.id = snapshot.key();
        ServerActionCreators.receiveBoard(boardData);
      }

      var watchOrg = (snapshot) => {
          var orgData = snapshot.val();
          orgData.id = snapshot.key();

          if(orgData.boards) {
            var boards = Object.keys(orgData.boards);
            bindToBoards(boards);
          }

          ServerActionCreators.receiveOrganization(orgData);
      }

      var data = dataSnapshot.val();
      if(data.organizations) {
        var orgs = Object.keys(data.organizations);
        orgs.every(org => {
          this.refs[org] = this.ref.child('organizations/' + org);
          this.refs[org].on('value', watchOrg);
          return true;
        });
      }
    });
  }

  unbindToUser() {
    this.userRef = {};
    this.refs = {};
  }

  createBoard(organizationId, name) {
    var boardRef = this.ref
      .child('boards')
      .push({
        name: name,
        organization_id: organizationId
      }, (err) => {
        if(err) throw err;
        this.ref.child('organizations/' + organizationId + '/boards/' + boardRef.key()).set(true);
      });
  }

  createOrganization(name) {
    var members = {};
    members[this.authData.uid] = true;

    var orgRef = this.ref
      .child('organizations')
      .push({ name: name, members: members }, (err) => {
        if(err) throw err;
        this.userRef.child('organizations/' + orgRef.key()).set(true);
      });
  }

  update(task) {
    this.ref
        .child('boards')
        .child(task.boardId)
        .child('tasks')
        .child(task.id)
        .set(task);
  }

  createTask(boardId, title) {
    this.ref
      .child('boards')
      .child(boardId)
      .child('tasks')
      .push({
        task: title,
        state: 'ideas',
        type: 'task',
        created_at: Firebase.ServerValue.TIMESTAMP
      });
  }

  removeTask(boardId, task) {
    this.ref
      .child('boards')
      .child(boardId)
      .child('tasks')
      .child(task.id)
      .remove();
  }
}

module.exports = new Data();
