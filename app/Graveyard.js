
  // postNewPlaces() {
  //   this.state.cards.forEach(card => {
  //     return this.db.ref(
  //       'userPlaces/' + this.props.userId + 
  //       '/places/' + card.venue.id).once('value')
  //       .then(snap => this.setUserPlaces(snap))
  //   })
  // }

  // setUserPlaces(snap) {
  //   if (!snap.val()) {
  //     this.db.ref('userPlaces/' + this.props.userId
  //     + '/places/' + card.venue.id).set({
  //       placeId: card.venue.id,
  //       name: card.venue.name,
  //       yes: 0,
  //       no: 0
  //     })
  //   }
  // }

    // writeUserData(user) {
  //   this.setState({ userId: user.uid })
  //   this.db.ref('users/' + user.uid).set({
  //     userId: user.uid,
  //     email: user.email,
  //     name: user.displayName
  //   })
  // }

  // setUserPlaces() {
  //   firebaseApp.ref('/users/' + this.state.userId + '/places/')
  //     .once('value').then(snapshot => {
  //       console.log(snapshot)
  //     })
  // }


  // test() {
  //   const cardId = this.state.cards[0] && this.state.cards[0].venue.id
  //   return this.db.ref('/users/'+this.props.userId+'/places/'+cardId)
  //     .once('value').then(snap => console.log("HERE IS THE VAL:", snap.val()))
  // }

  // dummyData() {
  //   this.state.cards.forEach(card => {
  //   this.db.ref('users/' + this.props.userId +
  //     '/places/' + card.venue.id).update({
  //       placeId: card.venue.id,
  //       name: card.venue.name,
  //     })
  //   })
  // }

  // postCardsToDB() {
  //   console.log("entered")
  //   this.state.cards.forEach(card => {
  //     let yes;
  //     let no;
  //     return this.db.ref('userplaces/'+this.props.userId+'/joinPlace/'+card.venue.id)
  //       .once('value').then(snap => {
  //         yes = snap.val() ? snap.val().yes : null
  //         no = snap.val() ? snap.val().no : null
  //       })
  //       .then(() => {
  //         this.db.ref('userPlaces/' + this.props.userId +
  //           '/places/' + card.venue.id).set({
  //           placeId: card.venue.id,
  //           name: card.venue.name,
  //           yes: yes,
  //           no: no
  //         })
  //       })
  //   })
  // }

  // sortCards() {

  // }

  // postNewPlaces() {
  //   this.state.cards.forEach(card => {
  //     let yes, no;
  //     return this.db.ref(
  //       'userPlaces/' + this.props.userId + 
  //       '/places/' + card.venue.id).once('value')
  //       .then(snap => {
  //         console.log(snap.val())
  //         if (snap.val()) {
  //           this.userPlaces.push({
  //             place: snap.val(), prob: snap.val().yes - snap.val().no
  //           })
  //           console.log("user places:", this.userPlaces)
  //         }
  //         if (!snap.val()) {
  //           this.userPlaces.push({
  //             place: {
  //               placeId: card.venue.id,
  //               name: card.venue.name,
  //               yes: 0,
  //               no: 0
  //             }
  //           })
  //           console.log()
  //           this.db.ref('userPlaces/' + this.props.userId
  //           + '/places/' + card.venue.id).set({
  //             placeId: card.venue.id,
  //             name: card.venue.name,
  //             yes: 0,
  //             no: 0
  //           })
  //             .then(snap => {console.log("does it return the snap", snap.val())})
  //             // want to see new snaps logged
  //         }
  //       })
  //   })
  // }