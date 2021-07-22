class Racer {
    constructor(d){
        this.pos = d.position;
        this.num = d.Driver.permanentNumber;
        this.code = d.Driver.code;
        this.name = `${d.Driver.givenName} ${d.Driver.familyName}`;
        this.team = d.Constructors[0].name;
        this.points = d.points;
    }
}