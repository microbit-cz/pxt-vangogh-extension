namespace vanGogh {
    // inicializace serv
    const _pen = PCAmotor.Servos.S1;
    const _left = PCAmotor.Steppers.STPM1;
    const _right = PCAmotor.Steppers.STPM2;
    // Jak moc se sníží pero nebo zvedne
    const _minPenHeight = 1900;
    const _maxPenHeight = 1260;
    //prumer kola v mm
    const _d = 65;
    //rychlost mm/ms
    const _spd = 0.0213;
    //rychlost deg/ms
    const _degSpd = 0.01815;

    // Kalibraci vzdy zacinejte az po Kalibraci vzdalenosti, jelikoz v ni pouzivam metody, ktere by bez kalibrace vzdalenosti nemuseli fungovat spravne

    // Kalibrace vzdalenosti
    export function calibDist()
    {
        penUp();
        basic.pause(500);
        PCAmotor.StepperStart(_left);
        PCAmotor.StepperStart(_right);
        basic.pause(500);
        PCAmotor.MotorStopAll();
        penDown();
        basic.pause(500);
        PCAmotor.StepperStart(_left);
        PCAmotor.StepperStart(_right);
        basic.pause(5000);
        PCAmotor.MotorStopAll();
        penUp();
    }

    // Kalibrace rotace
    export function calibRot()
    {
        vanGogh.penDown();
        vanGogh.fd(50);
        vanGogh.penUp();
        vanGogh.fd(50, false);
        PCAmotor.StepperStart(_left, false);
        PCAmotor.StepperStart(_right);
        basic.pause(5000);
        PCAmotor.MotorStopAll();
        vanGogh.penDown();
        vanGogh.fd(50);
        vanGogh.penUp();
        vanGogh.fd(50, false);
    }

    // Forward/Backward, dist v mm
    export function fd(dist: number, invert: boolean = true): void {
        PCAmotor.StepperStart(_left, invert);
        PCAmotor.StepperStart(_right, invert);
        basic.pause(calcDist(dist));
        PCAmotor.MotorStopAll();
    }

    // Rotate, deg ve stupnich
    export function re(deg: number, invert: boolean = true): void {
        PCAmotor.StepperStart(_left, !invert);
        PCAmotor.StepperStart(_right, invert);
        basic.pause(calcDeg(deg));
        PCAmotor.MotorStopAll();
    }

    // Vypocet vzdalenosti v mm na cas v ms
    function calcDist(t: number): number {
        return t/_spd;
    }

    function calcDeg(d: number): number {
        return d/_degSpd;
    }

    // Zvednuti tuzky
    export function penUp(): void {
        PCAmotor.GeekServo(_pen, _maxPenHeight);
        basic.showArrow(ArrowNames.North);
    }

    // Spusteni tuzky
    export function penDown(): void {
        PCAmotor.GeekServo(_pen, _minPenHeight);
        basic.showArrow(ArrowNames.South);
    }

    export function leafPart(): void {
        penDown();
        fd(100);
        penUp();
        PCAmotor.StepperStart(_left, false);
        PCAmotor.StepperStart(_right);
        basic.pause(500);
        PCAmotor.MotorStopAll();
        PCAmotor.StepperStart(_left, false);
        PCAmotor.StepperStart(_right, false);
        basic.pause(1600);
        PCAmotor.MotorStopAll();
        basic.pause(200);
    }
}