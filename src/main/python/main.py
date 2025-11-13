# ##########################################################################
# ###                                                                   ####
# ###       Application for the calculation of Slater energies          ####
# ###                   *for educational purposes*                      ####
# ###  **Energies calculated with Slater's Rules are not accurate**     ####
# ###                                                                   ####
# ###                                     R. Garcia Serres  03/08/2022  ####
# ##########################################################################
# ###             application for PyQT5 and Python3                     ####
# ##########################################################################


from fbs_runtime.application_context.PyQt5 import ApplicationContext

import numpy as np
from PyQt5.QtWidgets import QWidget, QMainWindow, QVBoxLayout, QHBoxLayout, QGridLayout, QLineEdit, QSpinBox,\
    QDoubleSpinBox, QGroupBox, QLabel, QSpacerItem, QSizePolicy, QAction
from PyQt5.QtCore import QTimer
from PyQt5.QtGui import QFont

import sys

"""
Data
"""

symbols = [" ","H","He","Li","Be","B","C","N","O","F","Ne",
            "Na","Mg","Al","Si","P","S","Cl","Ar",
            "K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn",
            "Ga","Ge","As","Se","Br","Kr",
            "Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd",
            "In","Sn","Sb","Te","I","Xe",
            "Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho",
            "Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg",
            "Tl","Pb","Bi","Po","At","Rn",
            "Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es",
            "Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn",
            "Nh","Fl","Mc","Lv","Ts","Og"]

orbitals = ['s','p','d','f','g','h','i','k','l','m','n','o','q','r','t','u',
            'v','w','x','y','z']

structures = ['','1s1','1s2','[He] 2s1','[He] 2s2','[He] 2s2 2p1',
        '[He] 2s2 2p2','[He] 2s2 2p3','[He] 2s2 2p4','[He] 2s2 2p5',
        '[He] 2s2 2p6',
        '[Ne] 3s1','[Ne] 3s2','[Ne] 3s2 3p1','[Ne] 3s2 3p2','[Ne] 3s2 3p3',
        '[Ne] 3s2 3p4','[Ne] 3s2 3p5','[Ne] 3s2 3p6',
        '[Ar] 4s1','[Ar] 4s2','[Ar] 3d1 4s2','[Ar] 3d2 4s2','[Ar] 3d3 4s2',
        '[Ar] 3d5 4s1','[Ar] 3d5 4s2','[Ar] 3d6 4s2','[Ar] 3d7 4s2',
        '[Ar] 3d8 4s2','[Ar] 3d10 4s1','[Ar] 3d10 4s2','[Ar] 3d10 4s2 4p1',
        '[Ar] 3d10 4s2 4p2','[Ar] 3d10 4s2 4p3','[Ar] 3d10 4s2 4p4',
        '[Ar] 3d10 4s2 4p5','[Ar] 3d10 4s2 4p6',
        '[Kr] 5s1','[Kr] 5s2','[Kr] 4d1 5s2','[Kr] 4d2 5s2','[Kr] 4d4 5s1',
        '[Kr] 4d5 5s1','[Kr] 4d5 5s2','[Kr] 4d7 5s1','[Kr] 4d8 5s1',
        '[Kr] 4d10','[Kr] 4d10 5s1','[Kr] 4d10 5s2','[Kr] 4d10 5s2 5p1',
        '[Kr] 4d10 5s2 5p2','[Kr] 4d10 5s2 5p3','[Kr] 4d10 5s2 5p4',
        '[Kr] 4d10 5s2 5p5','[Kr] 4d10 5s2 5p6',
        '[Xe] 6s1','[Xe] 6s2','[Xe] 5d1 6s2','[Xe] 4f1 5d1 6s2',
        '[Xe] 4f3 6s2','[Xe] 4f4 6s2','[Xe] 4f5 6s2','[Xe] 4f6 6s2',
        '[Xe] 4f7 6s2','[Xe] 4f7 5d1 6s2','[Xe] 4f9 6s2','[Xe] 4f10 6s2',
        '[Xe] 4f11 6s2','[Xe] 4f12 6s2','[Xe] 4f13 6s2','[Xe] 4f14 6s2',
        '[Xe] 4f14 5d1 6s2','[Xe] 4f14 5d2 6s2','[Xe] 4f14 5d3 6s2',
        '[Xe] 4f14 5d4 6s2','[Xe] 4f14 5d5 6s2','[Xe] 4f14 5d6 6s2',
        '[Xe] 4f14 5d7 6s2','[Xe] 4f14 5d9 6s1','[Xe] 4f14 5d10 6s1',
        '[Xe] 4f14 5d10 6s2','[Xe] 4f14 5d10 6s2 6p1','[Xe] 4f14 5d10 6s2 6p2',
        '[Xe] 4f14 5d10 6s2 6p3','[Xe] 4f14 5d10 6s2 6p4',
        '[Xe] 4f14 5d10 6s2 6p5','[Xe] 4f14 5d10 6s2 6p6',
        '[Rn] 7s1','[Rn] 7s2','[Rn] 6d1 7s2','[Rn] 6d2 7s2','[Rn] 5f2 6d1 7s2',
        '[Rn] 5f3 6d1 7s2','[Rn] 5f4 6d1 7s2','[Rn] 5f6 7s2','[Rn] 5f7 7s2',
        '[Rn] 5f7 6d1 7s2','[Rn] 5f9 7s2','[Rn] 5f10 7s2', '[Rn] 5f11 7s2',
        '[Rn] 5f12 7s2','[Rn] 5f13 7s2','[Rn] 5f14 7s2','[Rn] 5f14 7s2 7p1',
        '[Rn] 5f14 6d2 7s2','[Rn] 5f14 6d3 7s2','[Rn] 5f14 6d4 7s2',
        '[Rn] 5f14 6d5 7s2','[Rn] 5f14 6d6 7s2','[Rn] 5f14 6d7 7s2',
        '[Rn] 5f14 6d8 7s2','[Rn] 5f14 6d9 7s2','[Rn] 5f14 6d10 7s2',
        '[Rn] 5f14 6d10 7s2 7p1','[Rn] 5f14 6d10 7s2 7p2',
        '[Rn] 5f14 6d10 7s2 7p3','[Rn] 5f14 6d10 7s2 7p4',
        '[Rn] 5f14 6d10 7s2 7p5','[Rn] 5f14 6d10 7s2 7p6']

groups = [['1s'],['2s2p','2s2p'],['3s3p','3s3p','3d'],['4s4p','4s4p','4d','4f'],['5s5p','5s5p','5d','5f'],
          ['6s6p','6s6p','6d','6f','6g'],['7s7p','7s7p','7d','7f','7g','7h']]

E0 = 13.6

neff = [1,2,3,3.7,4.0,4.2]


class AppContext(ApplicationContext):

    def __init__(self):
        super(AppContext, self).__init__()

        # font config
        font = QFont()
        font.setFamily("Monospace")
        font.setStyleHint(QFont.StyleHint.Monospace)
        font.setFixedPitch(True)
        font.setPointSize(14)

        self.window = QMainWindow()
        wind = self.window
        wind.font = font
        wind.setFont(font)
        wind.title = 'Rule of Slater'
        wind.left = 400
        wind.top = 200
        wind.width = 350
        wind.height = 100
        wind.setWindowTitle(wind.title)
        wind.setGeometry(wind.left, wind.top, wind.width, wind.height)
        wind.statusBar().showMessage('tiny Slater calculator')

        # create central tab widget
        wind.calc_widget = calculator(wind)
        wind.setCentralWidget(wind.calc_widget)

        # Create menu bar and add actions
        menubar = wind.menuBar()
        filemen = menubar.addMenu('View')
        filemen.addAction(QAction(wind))

    def run(self):                              # 2. Implement run()
        self.window.show()
        return self.app.exec()                 # 3. End run() with this line




# ##############################################################################
#                            CALCULATION WIDGET
# ##############################################################################


class calculator(QWidget):

    def __init__(self, MainApp):
        super().__init__()

        self.MainApp = MainApp
        self.layout = QVBoxLayout(self)

        # Instructions label
        instructions = QLabel()
        instructions.setText(
            "1. Select element by typing symbol or atomic number\n"
            "2. The ground state electronic structure is displayed\n"
            "3. Modify structure 1 :  Changes are mirrored under structure 2\n"
            "4. Modify structure 2 : The energy difference between structures 1 and 2 is displayed"
        )
        instructions.setStyleSheet("QLabel { padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; }")

        self.atom = QGroupBox(); at = self.atom
        self.difference = QGroupBox(self); dif = self.difference
        self.config1 = configuration(self,1)
        self.config2 = configuration(self,2)
        at.layout = QHBoxLayout(at)
        at.Z = QSpinBox(); at.Zl = QLabel("Z")
        at.sym = QLineEdit(); at.syml = QLabel("element")
        at.sym.setFixedWidth(50)
        at.layout.addWidget(at.Zl); at.layout.addWidget(at.Z)
        at.layout.addWidget(at.syml); at.layout.addWidget(at.sym)
        spacer = QSpacerItem(0, 0, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        at.layout.addItem(spacer)
        dif.layout = QHBoxLayout(dif)
        dif.layout.setContentsMargins(6,3,6,3)
        dif.E = QDoubleSpinBox()
        dif.El = QLabel("difference (E2 - E1)"); dif.Eu = QLabel("eV")
        dif.E.setButtonSymbols(QSpinBox.ButtonSymbols(2))
        dif.E.setRange(-1E10,1E10)
        dif.E.setSpecialValueText("   whatever")
        dif.E.setReadOnly(True)
        dif.layout.addWidget(dif.El); dif.layout.addWidget(dif.E)
        dif.layout.addWidget(dif.Eu)
        self.layout.addWidget(instructions)
        self.layout.addWidget(at)
        self.layout.addWidget(self.config1)
        self.layout.addWidget(self.config2)
        self.layout.addWidget(dif)
        # actions connect
        at.Z.valueChanged.connect(self.updtZ)
        at.sym.textChanged.connect(self.updtsym)
        # initialize
        at.Z.setValue(1)

    def updtZ(self):
        at = self.atom
        z = at.Z.value()
        at.sym.blockSignals(True)
        at.sym.setText(symbols[z])
        at.sym.blockSignals(False)
        self.config1.updtstruc(atnum=z, mirror=False)
        self.config2.updtstruc(atnum=z, mirror=False)

    def updtsym(self):
        at = self.atom
        lbl = at.sym.text()
        at.Z.blockSignals(True)
        if lbl in symbols:
            z = symbols.index(lbl)
            at.Z.setValue(z)
            self.config1.updtstruc(atnum=z)
            self.config2.updtstruc(atnum=z)
        else:
            at.Z.setValue(0)
        at.Z.blockSignals(False)

    def calcdiff(self):
        E1 = -self.config1.energy.energy
        E2 = -self.config2.energy.energy
        if E1<=0 and E2<=0:
            self.difference.E.setValue(E2-E1)
        else:
            self.difference.E.setValue(-1E10)

    def flashymessage(self,message,color,zeit=5000):
        wind = self.MainApp
        def _normalstyle():
            wind.statusBar().setStyleSheet("QStatusBar{background::rgba(0,0,0,0);"
                        "color:black; font-size:10pt;"
                        "padding-left:100px}")
        wind.statusBar().setStyleSheet("QStatusBar{background:"+color+";"
                        "color:white; font-size:14pt;"
                        "padding-left:100px}")
        wind.statusBar().showMessage(message)
        QTimer.singleShot(zeit, _normalstyle)


"""
widget containing electronic structure, Zeff list, En list, orbital energy
"""

class configuration(QGroupBox):

    def __init__(self, calculator, i):
        super().__init__()

        self.rank = i
        self.calculator = calculator
        self.energy = QGroupBox(); en = self.energy
        self.layout = QVBoxLayout(self) ; en.layout = QGridLayout(en)
        self.layout.setSpacing(6)
        self.layout.setContentsMargins(6,3,6,3)
        en.layout.setContentsMargins(6,3,6,3)
        en.E = QLabel(); en.El = QLabel("E"+str(i)+" total"); en.Eu = QLabel("eV")
        en.E.setText("   enter structure")
        en.energy = 0.0
        en.gr = QLabel()
        en.zef = QLabel(); en.zefl = QLabel("Zeff (i)")
        en.zefl.setMinimumWidth(90)
        en.En = QLabel(); en.Enl = QLabel("-E (i)"); en.Enu = QLabel("eV")
        self.struc = QLineEdit()
        # lay out widgets
        en.layout.addWidget(en.gr, 1, 2)
        en.layout.addWidget(en.zefl,2,1); en.layout.addWidget(en.zef,2,2)
        en.layout.addWidget(en.Enl,3,1); en.layout.addWidget(en.En,3,2)
        en.layout.addWidget(en.Enu,3,3)
        en.layout.addWidget(en.El,4,1); en.layout.addWidget(en.E,4,2)
        en.layout.addWidget(en.Eu,4,3)
        self.layout.addWidget(QLabel("electronic structure "+str(i)))
        self.layout.addWidget(self.struc)
        self.layout.addWidget(en)
        # actions connect
        self.struc.textChanged.connect(self.updtstruc)

    def develop(self, struc):
        strucl = struc.split()
        ng = strucl[0][1:-1]
        if ng in symbols:
            strucl[0]=structures[symbols.index(ng)]
            return self.develop(' '.join(strucl))
        else:
            return struc

    def updtstruc(self, mirror=True, atnum=0):
        if atnum:
            self.struc.setText(self.develop(structures[atnum]))
        en = self.energy
        strc = self.struc.text()
        cal = self.calculator; ma = cal.MainApp
        if mirror and self.rank == 1:
            cal.config2.struc.setText(self.struc.text())
        ma.statusBar().showMessage('')
        Zeff = np.array([])
        A = self.analysis(strc)
        if type(A) == str:
            E = -1
            self.calculator.flashymessage(A,'red')
        else:
            Z = cal.atom.Z.value()
            group = self.group(A[0])
            Zeff = self.Zeff(Z,A[0],A[1])
            if (Zeff < 0).any():
                E = -1
                self.calculator.flashymessage('   unstable anion','red')
                group = []; Zeff = []
            else:
                En = self.En(A[0],Zeff)
                if type(En) == bool:
                    E = -1
                    self.calculator.flashymessage('   n must be < 7','red')
                    group = []; Zeff = []
                else:
                    E = np.sum(En)
        en.energy = E
        gstr = ""; zstr = ""; Estr = ""
        for i in range(len(Zeff)):
            colw = len(str(int(En[i]))) + 5
            gstr += group[i].ljust(colw)
            zstr += str("{0:.2f}".format(Zeff[i])).ljust(colw)
            Estr += str("{0:.2f}".format(En[i]/A[0][i,2])).ljust(colw)
        Etot = "" if E==-1 else ("-"+"{0:.2f}".format(E))
        en.gr.setText(gstr)
        en.zef.setText(zstr)
        en.En.setText(Estr)
        en.E.setText(Etot)
        cal.calcdiff()

    # test orbital string
    # return [n,l,N] list if correct, False if incorrect
    def test(self,orb):
        for x in orbitals:
            nN = orb.split(x)
            if len(nN) == 2:
                for i in range(2):
                    if nN[i].isdecimal():
                        nN[i] = int(nN[i])
                    else:
                        return False
                l = orbitals.index(x)
                return [nN[0],l,nN[1]]
        return False

    # analyze electronic structure string
    # string must be a sequence of orbitals separated by spaces
    # form of orbitals : quantum number n, letter(s,p,...), number of electrons
    # example of structure : "1s1 1s1 2s1 2p3"
    def analysis(self,strc):
        orblist = strc.split( )
        # make list of orbitals, each orbital = list [n,l,N]
        nlNlist = []
        for i in range(len(orblist)):
            orbtest = self.test(orblist[i])
            if orbtest:
                orbtest.append(i)
                nlNlist.append(orbtest)
        # sort by n then l then N
        nlNarr = np.array(sorted({tuple(x): x for x in nlNlist}.values()))
        if nlNarr.size == 0 :
            return ""
        nlNarr = nlNarr[:,:3]
        # return False if 1st orbital wrong
        if nlNarr[0,1] > (nlNarr[0,0] -1):
            return "  there is no such orbital"
        nlN = np.array([nlNarr[0]])
        # merge orbitals in same group
        for i in range(1,len(nlNarr)):
            # detect wrong orbitals
            if nlNarr[i,1] > (nlNarr[i,0] -1):
                return "  there is no such orbital"
            # merge with previous
            merge = (nlNarr[i,:2] == nlN[-1,:2]).all()
            if merge:
                nlN[-1,2] += nlNarr[i,2]
            else:
                nlN = np.append(nlN,np.array([nlNarr[i]]),axis=0)
        nlNarr = nlN
        # return False if 1st orbital overloaded
        if (nlNarr[0,2] > (4*nlNarr[0,1]+2)):
            return "   this orbital has too many electrons"
        nlN = np.expand_dims(nlNarr[0], axis=0)
        for i in range(1,len(nlNarr)):
            # detect overloaded orbitals
            if (nlNarr[i,2] > (4*nlNarr[i,1]+2)):
                return "orbital has too many electrons"
            merge = ((nlNarr[i,0] == nlN[-1,0])
                        and (nlNarr[i,1] + nlN[-1,1] == 1))
            if merge:
                nlN[-1,2] += nlNarr[i,2]
            else:
                nlN = np.append(nlN,np.array([nlNarr[i]]),axis=0)
        # build sigma(ij) triangular matrix
        sij = np.tril(np.ones(len(nlN)))
        sij -= np.diag(np.diag(sij)*0.65)
        if (nlN[0,0]+nlN[0,1] == 1):
            sij[0,0] = 0.3
        for j in range(1,4):
            d = len(np.diag(sij,k=-j))
            for i in range(d):
                if (nlN[i+j,1] < 2) and (nlN[i,0] == nlN[i+j,0] - 1):
                    sij[i+j,i] = 0.85
        return nlN, sij

    # calculate groups array
    def group(selfself,nlN):
        gr = []
        for nN in nlN:
            gr.append(groups[nN[0]-1][nN[1]])
        return gr

    # calculate Zeff array
    def Zeff(self,Z,nlN,sij):
        sig = nlN[:,2] * sij - np.diag(np.diag(sij))
        sig = np.sum(sig,axis=1)
        return Z - sig

    # caclulate En array
    def En(self,nlN,Zeff):
        L = len(nlN)
        n = nlN[:,0].astype(int)
        nstar = n.astype(float)
        if (n>6).any():
            return False
        for i in range(L):
            nstar[i] = neff[n[i]-1]
        return E0*nlN[:,2]*(Zeff/nstar)**2



# ##############################################################################
#                                  RUN
# ##############################################################################

if __name__ == '__main__':
    appctxt = AppContext()
    exit_code = appctxt.run()
    sys.exit(exit_code)