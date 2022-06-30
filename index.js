var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function PromiseSome(promises, signal) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = new Array(promises.length);
        let earlyExitResult = undefined;
        const earlyExitToken = Symbol("PromiseSome early exit");
        const exitPromise = signal.then((result) => {
            earlyExitResult = result;
            return earlyExitToken;
        });
        const allPromise = Promise.all(promises.map((p, idx) => {
            return p.then((result) => {
                results[idx] = result;
                return;
            });
        }));
        const result = yield Promise.race([exitPromise, allPromise]);
        return { results, earlyExitResult, didExitEarly: result === earlyExitToken };
    });
}
export default PromiseSome;
