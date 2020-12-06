# Exercise outputs

## Part 1

### 1.01

```zsh
$ kubectl create deployment main-app-dep --image=partanenjoonas/main-app

$ kubectl get deployments
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
main-app-dep   1/1     1            1           16m
```

### 1.02

```zsh
$ kubectl create deployment todo-app-dep --image=partanenjoonas/todo-app

$ kubectl get deployments
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
main-app-dep   1/1     1            1           18m
todo-app-dep   1/1     1            1           5m10s

$ kubectl get pods
NAME                            READY   STATUS    RESTARTS   AGE
main-app-dep-59d98fc87f-qqsdb   1/1     Running   0          19m
todo-app-dep-f48f4866-8jrnn     1/1     Running   0          5m50s
```

### 1.03

```zsh
$ kubectl kubectl delete deployment main-app-dep
deployment.apps "main-app-dep" deleted

$ kubectl apply -f manifests/deployment.yaml
deployment.apps/main-app-dep created

$ kubectl get pods
NAME                            READY   STATUS    RESTARTS   AGE
todo-app-dep-f48f4866-8jrnn     1/1     Running   0          20m
main-app-dep-7c6cb84746-q6mb6   1/1     Running   0          33s

$ kubectl logs -f main-app-dep-7c6cb84746-q6mb6

> main-application@1.0.0 start
> node index.js

73191d08-3e28-4904-8545-c42a82cb7b04
9520afce-622c-492e-b7aa-846eb9cd2743
a5193454-aeca-4f71-9323-906ef4bf677c
```

### 1.04

```zsh
$ kubectl delete deployment todo-app-dep
deployment.apps/todo-app-dep deleted

$ kubectl apply -f manifests/deployment.yaml
deployment.apps/todo-app-dep created

$ kubectl get pods
NAME                            READY   STATUS    RESTARTS   AGE
main-app-dep-7c6cb84746-q6mb6   1/1     Running   0          5m18s
todo-app-dep-669cddc7b7-7nrr5   1/1     Running   0          42s

$ kubectl logs -f todo-app-dep-669cddc7b7-7nrr5

> todo-app@1.0.0 start
> node index.js

Server started in port 8000

```

### 1.05

```zsh
$ kubectl get po
NAME                            READY   STATUS    RESTARTS   AGE
main-app-dep-7c6cb84746-q6mb6   1/1     Running   0          27m
todo-app-dep-856c6d5b5c-tvfpd   1/1     Running   0          16s

$ kubectl port-forward todo-app-dep-856c6d5b5c-tvfpd 8008:8000
Forwarding from 127.0.0.1:8008 -> 8000
Forwarding from [::1]:8008 -> 8000
Handling connection for 8008
Handling connection for 8008
```

### 1.06

```zsh
$ k3d cluster create --port '8002:30080@agent[0]' -p 8001:80@loadbalancer --agents 2
INFO[0000] Created network 'k3d-k3s-default'
INFO[0000] Created volume 'k3d-k3s-default-images'
INFO[0001] Creating node 'k3d-k3s-default-server-0'
INFO[0006] Creating node 'k3d-k3s-default-agent-0'
INFO[0007] Creating node 'k3d-k3s-default-agent-1'
INFO[0007] Creating LoadBalancer 'k3d-k3s-default-serverlb'
INFO[0008] (Optional) Trying to get IP of the docker host and inject it into the cluster as 'host.k3d.internal' for easy access
INFO[0013] Successfully added host record to /etc/hosts in 4/4 nodes and to the CoreDNS ConfigMap
INFO[0013] Cluster 'k3s-default' created successfully!
INFO[0013] You can now use it like this:
kubectl cluster-info

$ kubectl apply -f manifests/deployment.yaml
deployment.apps/todo-app-dep created

$ kubectl apply -f manifests/service.yaml
service/todo-app-svc created

$ curl http://localhost:8002

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yet Another Todo App</title>
  </head>
  <body>
    <h1>Yet Another Todo App</h1>
  </body>
</html>
```

### 1.07

```zsh
$ kubectl apply -f manifests/deployment.yaml
deployment.apps/main-app-dep created

$ kubectl apply -f manifests/service.yaml
service/main-app-svc configured

$ kubectl apply -f manifests/ingress.yaml
Warning: extensions/v1beta1 Ingress is deprecated in v1.14+, unavailable in v1.22+; use networking.k8s.io/v1 Ingress
ingress.extensions/main-app-ingress configured

$ kubectl get svc
NAME           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
todo-app-svc   NodePort    10.43.221.115   <none>        1234:30080/TCP   32m
kubernetes     ClusterIP   10.43.0.1       <none>        443/TCP          13m
main-app-svc   ClusterIP   10.43.207.77    <none>        2345/TCP         7m3s

$ kubectl get ing
Warning: extensions/v1beta1 Ingress is deprecated in v1.14+, unavailable in v1.22+; use networking.k8s.io/v1 Ingress
NAME               CLASS    HOSTS   ADDRESS      PORTS   AGE
main-app-ingress   <none>   *       172.20.0.2   80      7m

$ curl http://localhost:8001
1:08:02 PM: 5d0df386-3420-4b58-b3e5-ee1b352cc67d%
```

### 1.08

```zsh
$ kubectl apply -f manifests/service.yaml
service/todo-app-svc configured

$ kubectl apply -f manifests/ingress.yaml
Warning: extensions/v1beta1 Ingress is deprecated in v1.14+, unavailable in v1.22+; use networking.k8s.io/v1 Ingress
ingress.extensions/todo-app-ingress created

$ curl http://localhost:8001
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yet Another Todo App</title>
  </head>
  <body>
    <h1>Yet Another Todo App</h1>
  </body>
</html>
```

### 1.09

```zsh
$ kubectl apply -f manifests/service.yaml
service/main-app-svc configured

$ kubectl apply -f manifests/ingress.yaml
Warning: extensions/v1beta1 Ingress is deprecated in v1.14+, unavailable in v1.22+; use networking.k8s.io/v1 Ingress
ingress.extensions/main-app-ingress created

$ curl http://localhost:8001/pingpong
pong 1
```

### 1.10

```zsh
$ curl http://localhost:8001/
7:12:31 AM: 69161c61-0cfd-4b75-926d-111cf9a0bc07
```

### 1.11

```zsh
$ kubectl apply -f manifests/persistentvolume.yaml
persistentvolume/example-pv created

$ kubectl apply -f manifests/persistentvolumeclaim.yaml
persistentvolumeclaim/hash-claim created

$ kubectl apply -f manifests/deployment.yaml
deployment.apps/main-apps-dep configured

$ curl http://localhost:8001/
<p>8:27:03 AM: 82f1da4c-6eb2-45fe-8c60-c7bb90a20d59</p><p>Ping / Pongs: 0</p>
```

### 1.12

```zsh
$ curl http://localhost:8001/todoapp
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yet Another Todo App</title>
  </head>
  <body>
    <h1>Yet Another Todo App</h1>
    <img src="todoapp/img/pic.jpg">
  </body>
</html>
```

### 1.13

```zsh
$ curl http://localhost:8001/todoapp
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yet Another Todo App</title>
  </head>
  <body>
    <h1>Yet Another Todo App</h1>
    <img src="todoapp/img/pic.jpg" width="400px" height="400px" />
    <form>
      <input type="text" name="todo" />
      <input type="submit" value="Add todo" />
    </form>
    <ul id="todo-list">
    </ul>
  </body>
</html>

<script>
  const fetchTodos = () => {
    fetch('/todoapp/todos')
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById('todo-list')
        data.forEach(todo => {
          const listItem = document.createElement('li')
          listItem.appendChild(document.createTextNode(todo.content))
          list.appendChild(listItem)
        });
      })
  }

  document.addEventListener("DOMContentLoaded", fetchTodos);
</script>
```

### 2.01

```zsh
$ curl http://localhost:8001/
<p>12:06:13 PM: 474aad8a-f988-4b30-9cb7-3e9b229887c7</p><p>Ping / pongs: 18</p>
```

### 2.02

See [todo-app](https://github.com/joonaspartanen/devops-with-kubernetes/tree/f3362444d6f301da3cb9c63339639590acb8e01f/todo-app).

### 2.03-2.05

See commit history.

### 2.06

```zsh
$ kubectl apply -f manifests/deployment.yaml
deployment.apps/main-apps-dep configured

$ kubectl apply -f manifests/configmap.yaml
configmap/dotenv-configmap configured

$ curl http://localhost:8001/
<p>hello</p><p>4:12:13 PM: 980815ff-fe99-46b3-8ee2-f11062b69ae2</p><p>Ping / pongs: 3</p>
```

### 2.07

```zsh
$ curl http://localhost:8001/
<p>hello</p><p>8:45:32 PM: 9f3e07de-5020-4922-adad-12a4cb936fb1</p><p>Ping / pongs: 22</p>

$ kubectl get pods -n main-namespace
NAME                                READY   STATUS                       RESTARTS   AGE
postgres-ss-0                       1/1     Running                      2          3d4h
main-apps-dep-75ff8cc588-gdj89      2/2     Running                      6          4d4h
pingpong-app-dep-6f86dc8c6d-tk6zt   1/1     Running                      0          12m

$ kubectl delete pod pingpong-app-dep-6f86dc8c6d-tk6zt -n main-namespace
pod "pingpong-app-dep-6f86dc8c6d-tk6zt" deleted

$ curl http://localhost:8001/
<p>hello</p><p>8:46:38 PM: 366b4b3a-8085-4635-be97-a34c93e3119a</p><p>Ping / pongs: 23</p>
```

### 2.08

See [todo-app](https://github.com/joonaspartanen/devops-with-kubernetes/tree/8a20d0607e3d656dfc52d3f1a94b59e9535a55ed/todo-app).
