// infrastructure
class MedicInfrastructure implements MedicRepository {
  add(medic: Medic) {
    console.log("medic added");
  }

  toString() {
    return "";
  }
}

// application
class MedicApplication {
  private repository: MedicRepository;

  constructor() {
    this.repository = new MedicInfrastructure();
  }

  insert(medic: Medic) {
    this.repository.add(medic);
  }
}

// domain
type MedicRepository = {
  add(medic: Medic): void;
};

class Medic {
  medicId: number;
  firstname: string;
  lastname: string;
  specialtyId: number;
  cmp: string;

  constructor(
    firtsname: string,
    lastname: string,
    specialtyId: number,
    cmp: string
  ) {
    this.firstname = firtsname;
    this.lastname = lastname;
    this.specialtyId = specialtyId;
    this.cmp = cmp;

    this.medicId = Math.floor(Math.random() * 100000 + 1);
  }
}

const medic = new Medic("Juan", "Tapia", 10, "abc123");
const application = new MedicApplication();

application.insert(medic);
