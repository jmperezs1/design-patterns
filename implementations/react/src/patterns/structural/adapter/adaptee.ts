
export class Adaptee {

    specificRequest(): Promise<string>{
        return Promise.resolve('id,name,email\n1,Juan Perez,juanperez@example.com\n2,Mario,mario@example.com\n3,Camila,camila@example.com')
    }

}