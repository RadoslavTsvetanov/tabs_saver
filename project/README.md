_SELF HOSTED_

- will make a docker compose which just runs the backend
- will need to install the extension and there to configure the url to which you are sending snapshots

_NOT SELF HOSTED_

- just download the extension and create an account

_CHANGING THINGS_

- if you want to change the db so that its self hosted you need to change the db fields in .env

_HOW IT WORKS_

- you create snapshots of your current browser state and every time you make a change to your tabs iy will automatically track this change so that after every change you essentially save your browser state
- if you want to make a new whole snapshots of your browser state you just click take new snapshot (NOTE! since i dont wanna go outside free tier of my db after the third snapshot [snapshot in my case is more like a session history and not a single saved state so essentially a snapshot tracks all your activity until a new one is created but you can also switch to old snapshots]) and it will start tracking
- you can switch between snapshots and restore browser to a certain version
- a `tabs state` is restored using applying the changes recorded to the base snapshot which was ,ade when starting the new session

_IN THE FUTURE_

- will add paid tier which will allow for more snapshots at the same time

_TECH USED_

- php and ts for backend (decided to migrate to pure ts since a framework like laravel is too much for such a simple project and it actually makes me slower but in the future might migrate it back)
- mongoDB for its use of use and relatively generous free tier but due to the relatively complex data structures will migrate to mysql once planetscale returns its free tier in Bulgaria and since i have added a separation between the core db logic and the actual state it will be easy to migrate
- vite and react for the frontend of the web extension
