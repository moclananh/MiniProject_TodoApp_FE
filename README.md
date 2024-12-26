### This is my OJT Training Project in FPT Software
### Author: ThanhTH10
### Technical approaches
1. BE: ASP .NET Web API
2. FE: ReactJS
3. DB: MSSQL with store procedures
4. Deployment: IIS

### Slide presentation:
Slide: https://www.canva.com/design/DAGZs_68nkA/T3P0ImUFxvMgZ5JRWs9xAw/edit?utm_content=DAGZs_68nkA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

### Feature
1. Login/logout
2. CRUD Todos
3. Filter Todos

### User Guide
1. Clone source code:
```
git clone [https://p3-devops.fsoft.com.vn/P3/Actuos/_git/OJT_Training](https://github.com/moclananh/MiniProject_TodoApp)
```

2. Set-up BE:
- Set startup project Domain
- Config appsettings.json
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TodoDb3;Encrypt=True;TrustServerCertificate=True;User ID=sa;Password=123456;TrustServerCertificate=True;" //replace with your SQL Settings
  }
}
```
- Set start-up project API
- Config appsettings.json
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TodoDb3;Encrypt=True;TrustServerCertificate=True;User ID=sa;Password=123456;TrustServerCertificate=True;" //replace with your SQL Settings
  }
}
```
- Run the project in port: 5001


3. Set-up FE
- clone src FE:
```
git clone https://github.com/moclananh/MiniProject_TodoApp_FE
```
- config the project: /src/libs/axios-custom.js
```
const httpClient = axios.create({
  baseURL: "https://localhost:5001/api", //config with correct URL
});
```

```
yarn
```

- run project
```
yarn dev
```
